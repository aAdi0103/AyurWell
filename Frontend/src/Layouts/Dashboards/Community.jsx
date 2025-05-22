import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { FaPlus, FaCheck, FaSearch, FaPaperPlane } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

const SOCKET_SERVER_URL = "http://localhost:3000";
let socket;

const Community = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showGroupList, setShowGroupList] = useState(true);

  const chatContainerRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("authUser"));

  // Check mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize socket
  useEffect(() => {
    socket = io(SOCKET_SERVER_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("join", { userId: user._id });
    });

    socket.on("receiveMessage", ({ message }) => {
      setChats((prev) => [...prev, message]);
      scrollToBottom();
    });

    return () => socket.disconnect();
  }, [user._id]);

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const [resJoined, resAll] = await Promise.all([
          axiosInstance.get("/group/getGroups"),
          axiosInstance.get("/group/getAllGroups"),
        ]);

        setJoinedGroups(resJoined.data.groups);
        setAllGroups(
          resAll.data.groups.map((group) => ({
            ...group,
            isMember: resJoined.data.groups.some((g) => g._id === group._id),
          }))
        );
      } catch (err) {
        toast.error("Failed to load groups");
        console.error(err);
      }
    };

    fetchGroups();
  }, []);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleGroupClick = async (group) => {
    setSelectedGroup(group);
    if (isMobileView) setShowGroupList(false);
    try {
      const res = await axiosInstance.get(`/chat/getAllMessages/${group._id}`);
      setChats(res.data.messages || []);
      socket.emit("joinRoom", { roomId: group._id });
    } catch (err) {
      toast.error("Failed to fetch chats");
      console.error(err);
    }
  };

  const handleAddGroup = async (group) => {
    try {
      const res = await axiosInstance.post("/group/addMemberToGroup", {
        groupId: group._id,
      });
      if (res.data.message) {
        setJoinedGroups((prev) => [...prev, group]);
        setAllGroups((prev) =>
          prev.map((g) => (g._id === group._id ? { ...g, isMember: true } : g))
        );
        toast.success(`Joined "${group.name}"`);
      }
    } catch (err) {
      toast.error("Failed to join group");
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      toast.error("Group name cannot be empty");
      return;
    }
    try {
      const res = await axiosInstance.post("/group/createGroup", {
        groupName: newGroupName,
        groupDescription: "Ayurvedic Group",
      });
      const newGroup = { ...res.data.group, isMember: true };
      setAllGroups((prev) => [...prev, newGroup]);
      setJoinedGroups((prev) => [...prev, newGroup]);
      setNewGroupName("");
      setShowCreateInput(false);
      toast.success("Group created!");
    } catch (err) {
      toast.error("Failed to create group");
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedGroup) return;

    const messageObj = {
      id: Date.now(),
      sender: { id: user._id, name: user.name },
      content: newMessage,
      senderId: user._id,
    };

    socket.emit("sendMessage", {
      roomId: selectedGroup._id,
      message: messageObj,
    });
    setNewMessage("");
  };

  const handleLeaveGroup = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      await axiosInstance.get(`/group/leaveGroup/${groupId}`);
      toast.success("Group left");

      setJoinedGroups((prev) => prev.filter((g) => g._id !== groupId));

      if (selectedGroup?._id === groupId) setSelectedGroup(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete group");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this group?"
      );
      if (!confirmDelete) return;

      const res = await axiosInstance.get(`/group/delete/${groupId}`); // Adjust endpoint
      if (res.status === 200) {
        // Update local state
        setAllGroups((prev) => prev.filter((g) => g._id !== groupId));
      }
    } catch (error) {
      console.error("Failed to delete group:", error);
      toast.error("Error deleting group.");
    }
  };

  const filteredGroups = allGroups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col overflow-y-hidden md:flex-row h-screen text-gray-800">
      {/* Sidebar - Group List */}
      {(showGroupList || !isMobileView) && (
        <div
          className={`w-full md:w-80 overflow-y-scroll h-screen border-r border-gray-200 bg-white ${
            isMobileView ? "fixed inset-0 z-50" : ""
          }`}
        >
          <div className="p-4 border-b border-gray-200 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-700">Your Groups</h2>
              {isMobileView && (
                <button
                  onClick={() => setShowGroupList(false)}
                  className="text-gray-500 hover:text-gray-700 overflow-hidden"
                >
                  <BiArrowBack size={20} />
                </button>
              )}
            </div>

            {showCreateInput ? (
              <div className="flex gap-2 mb-4">
                <input
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Group name"
                  className="flex-1 p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  autoFocus
                />
                <button
                  onClick={handleCreateGroup}
                  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition"
                >
                  Create
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCreateInput(true)}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition mb-4"
              >
                <FaPlus /> Create Group
              </button>
            )}

            {/* Joined Groups */}
            <div className="space-y-2 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Your Groups
              </h3>
              {joinedGroups.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  You haven't joined any groups yet
                </p>
              ) : (
                joinedGroups.map((group) => (
                  <div
                    key={group._id}
                    onClick={() => handleGroupClick(group)}
                    className={`cursor-pointer p-3 rounded-md flex items-center ${
                      selectedGroup?._id === group._id
                        ? "bg-green-100 text-green-800 border-l-4 border-green-600"
                        : "hover:bg-gray-100"
                    } transition`}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
                      {group.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium flex-1">{group.name}</span>

                    <button
                      onClick={() => handleLeaveGroup(group._id)}
                      className="ml-auto text-red-600 hover:text-red-800 text-sm"
                      title="Delete group"
                    >
                      Leave
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Group Search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search groups..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* All Groups */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Discover Groups
              </h3>
              {filteredGroups.length === 0 ? (
                <p className="text-gray-500 text-sm">No groups found</p>
              ) : (
                filteredGroups.map((group) => (
                  <div
                    key={group._id}
                    className="flex justify-between items-center p-3 rounded hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                        {group.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{group.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {group.isMember ? (
                        <div className="text-green-600 flex items-center text-sm">
                          <FaCheck className="mr-1" /> Joined
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddGroup(group)}
                          className="text-sm bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition flex items-center"
                        >
                          <FaPlus className="mr-1" /> Join
                        </button>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteGroup(group._id)}
                        className="text-sm bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat Section */}
      <div
        className={`flex-1 flex flex-col overflow-y-hidden   ${!selectedGroup && "hidden md:flex"}`}
      >
        {selectedGroup ? (
          <>
            <div className="border-b border-gray-200 p-4 bg-white flex items-center">
              {isMobileView && (
                <button
                  onClick={() => setShowGroupList(true)}
                  className="mr-3 z-10 text-gray-500 hover:text-gray-700"
                >
                  <BiArrowBack size={20} />
                </button>
              )}
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
                {selectedGroup.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-semibold">{selectedGroup.name}</h2>
                <p className="text-xs text-gray-500">{chats.length} messages</p>
              </div>
            </div>

            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
              {chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p>No messages yet</p>
                  <p className="text-sm">Be the first to send a message!</p>
                </div>
              ) : (
                chats.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      chat.senderId === user._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        chat.senderId === user._id
                          ? "bg-green-500 text-white rounded-br-none"
                          : "bg-white border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      {chat.senderId !== user._id && (
                        <div className="font-semibold text-xs text-gray-500 mb-1">
                          {chat.sender?.name || chat.senderName}
                        </div>
                      )}
                      <div>{chat.text || chat.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          chat.senderId === user._id
                            ? "text-green-100"
                            : "text-gray-400"
                        }`}
                      >
                        {new Date(chat.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={handleSend}
              className="border-t border-gray-200 p-4 bg-white"
            >
              <div className="flex">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <FaSearch size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Select a group</h3>
            <p className="text-gray-400 max-w-md">
              Choose an existing group from the sidebar or create a new one to
              start chatting with the community.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
