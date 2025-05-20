import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaCheck } from 'react-icons/fa';

const dummyJoinedGroups = [
  { id: 1, name: "Ayurveda Lovers" },
  { id: 2, name: "Herbal Remedies" },
];

const dummyAllGroups = [
  { id: 1, name: "Ayurveda Lovers" },
  { id: 2, name: "Herbal Remedies" },
  { id: 3, name: "Natural Healing" },
  { id: 4, name: "Organic Wellness" },
];

const dummyChats = {
  1: [
    { id: 1, sender: "user", message: "Hi everyone!" },
    { id: 2, sender: "other", message: "Welcome to Ayurveda Lovers!" },
  ],
  2: [
    { id: 1, sender: "user", message: "Any tips for cold?" },
    { id: 2, sender: "other", message: "Try tulsi tea!" },
  ]
};

const Community = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    setJoinedGroups(dummyJoinedGroups);
    setAllGroups(dummyAllGroups);
  }, []);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setChats(dummyChats[group.id] || []);
  };

  const handleAddGroup = (group) => {
    if (!joinedGroups.find(g => g.id === group.id)) {
      setJoinedGroups([...joinedGroups, group]);
    }
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      setChats([...chats, { id: Date.now(), sender: "user", message: newMessage }]);
      setNewMessage("");
    }
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: Date.now(), // Ideally, this should come from DB
      name: newGroupName
    };

    setAllGroups([...allGroups, newGroup]);
    setJoinedGroups([...joinedGroups, newGroup]);
    setNewGroupName("");
    setShowCreateInput(false);
  };

  const filteredGroups = allGroups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col md:flex-row h-screen bg-green-50 text-green-900">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 border-r border-green-300 p-4 bg-green-100">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Your Groups</h2>
          <button
            onClick={() => setShowCreateInput(!showCreateInput)}
            className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
          >
            {showCreateInput ? "Cancel" : "Create Group"}
          </button>
        </div>

        {showCreateInput && (
          <div className="my-2 flex items-center gap-2">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Group name"
              className="flex-1 p-2 border rounded-md bg-white"
            />
            <button
              onClick={handleCreateGroup}
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              Create
            </button>
          </div>
        )}

        <div className="space-y-2">
          {joinedGroups.map(group => (
            <div
              key={group.id}
              onClick={() => handleGroupClick(group)}
              className="cursor-pointer p-2 rounded-md bg-green-200 hover:bg-green-300 transition"
            >
              {group.name}
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-xl font-semibold">Find Groups</h3>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search groups..."
          className="w-full mt-2 p-2 border rounded-md bg-white"
        />
        <div className="mt-2 space-y-2">
          {filteredGroups.map(group => (
            <div key={group.id} className="flex justify-between items-center bg-green-50 p-2 rounded-md border">
              <span>{group.name}</span>
              {joinedGroups.find(g => g.id === group.id) ? (
                <button className="bg-green-300 text-white px-2 py-1 rounded flex items-center">
                  <FaCheck className="mr-1" /> Added
                </button>
              ) : (
                <button
                  onClick={() => handleAddGroup(group)}
                  className="bg-green-500 text-white px-2 py-1 rounded flex items-center"
                >
                  <FaPlus className="mr-1" /> Add
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-full md:w-2/3 flex flex-col h-full">
        {selectedGroup ? (
          <>
            <div className="bg-green-200 p-4 text-xl font-semibold border-b border-green-300">
              {selectedGroup.name}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-green-50">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  className={`max-w-xs p-2 rounded-md ${
                    chat.sender === "user"
                      ? "bg-green-300 text-right self-end ml-auto"
                      : "bg-white text-left"
                  }`}
                >
                  {chat.message}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-green-300 bg-green-100 flex">
              <input
                type="text"
                className="flex-1 p-2 border rounded-l-md"
                placeholder="Type your message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-xl text-green-600">
            Select a group to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
