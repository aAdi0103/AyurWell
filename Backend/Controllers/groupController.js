import Group from "../Models/GroupModel.js"
 // Assuming you have a User model defined in models/User.js
export const createGroup = (req, res) => {
    
    const { groupName, groupDescription } = req.body;

    if (!groupName || !groupDescription) {
        return res.status(400).json({ message: "Group name and description are required." });
    }

    const newGroup = new Group({
        groupName,
        groupDescription,
        createdBy: req.user._id
    });

    newGroup.save()
        .then(group => {
            res.status(201).json({ message: "Group created successfully", group });
        })
        .catch(err => {
            console.error("Error creating group:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

export const getGroups = (req, res) => {
    Group.find({ members: req.user._id })
        .populate('members', 'name email')
        .then(groups => {
            res.status(200).json({ groups });
        })
        .catch(err => {
            console.error("Error fetching groups:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}


export const getGroupDetails = (req, res) => {
    const { groupId } = req.params;

    Group.findById(groupId)
        .populate('members', 'name email')
        .then(group => {
            if (!group) {
                return res.status(404).json({ message: "Group not found." });
            }
            res.status(200).json({ group });
        })
        .catch(err => {
            console.error("Error fetching group details:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

export const addMemberToGroup = (req, res) => {
    const { groupId, userId } = req.body;

    if (!groupId || !userId) {
        return res.status(400).json({ message: "Group ID and User ID are required." });
    }

    Group.findByIdAndUpdate(groupId, { $addToSet: { members: userId } }, { new: true })
        .then(group => {
            if (!group) {
                return res.status(404).json({ message: "Group not found." });
            }
            res.status(200).json({ message: "User added to group successfully", group });
        })
        .catch(err => {
            console.error("Error adding member to group:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}

export const removeMemberFromGroup = (req, res) => {
    const { groupId, userId } = req.body;

    if (!groupId || !userId) {
        return res.status(400).json({ message: "Group ID and User ID are required." });
    }

    Group.findByIdAndUpdate(groupId, { $pull: { members: userId } }, { new: true })
        .then(group => {
            if (!group) {
                return res.status(404).json({ message: "Group not found." });
            }
            res.status(200).json({ message: "User removed from group successfully", group });
        })
        .catch(err => {
            console.error("Error removing member from group:", err);
            res.status(500).json({ message: "Internal server error" });
        });
}


