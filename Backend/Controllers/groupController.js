import Group from "../Models/GroupModel.js"
 // Assuming you have a User model defined in models/User.js
export const createGroup = (req, res) => {
    
    const { groupName, groupDescription } = req.body;

    if (!groupName || !groupDescription) {
        return res.status(400).json({ message: "Group name and description are required." });
    }



    const newGroup = new Group({
        name:groupName,
        description: groupDescription,
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

export const getAllGroups = async (req, res) => {
  try {
    const userId = req.user._id; // assuming user is authenticated and user object is set

    const groups = await Group.find();

    const enrichedGroups = groups.map(group => {
      const isMember = group.members.includes(userId);
      return {
        _id: group._id,
        name: group.name,
        description: group.groupDescription,
        isMember,
      };
    });

    return res.status(200).json({
      success: true,
      groups: enrichedGroups,
    });
  } catch (e) {
    console.error('Error fetching groups:', e.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch groups',
    });
  }
};



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

export const addMemberToGroup = async (req, res) => {
    const userId = req.user._id;
    const { groupId } = req.body;

    
    if (!groupId || !userId) {
        return res.status(400).json({ message: "Group ID and User ID are required." });
    }

    try {
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: "Group not found." });
        }

        // Check if user is already a member
        const isAlreadyMember = group.members.includes(userId);
        if (isAlreadyMember) {
            return res.status(200).json({ message: "User already present in group", group });
        }

        // Add user if not already a member
        group.members.push(userId);
        await group.save();

        res.status(200).json({ message: "User added to group successfully", group });
    } catch (err) {
        console.error("Error adding member to group:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


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

export const leaveGroup = async (req, res) => {
  try {
    const { id: groupId } = req.params; // group ID
    const userId = req.user.id; // assuming user is authenticated and user ID is in req.user

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is part of the group
    if (!group.members.includes(userId)) {
      return res.status(400).json({ message: 'You are not a member of this group' });
    }

    // Remove the user from the group members
    group.members = group.members.filter(member => member.toString() !== userId);

    await group.save();

    res.status(200).json({ message: 'Left the group successfully', group });
  } catch (error) {
    res.status(500).json({ message: 'Failed to leave group', error: error.message });
  }
};




export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGroup = await Group.findByIdAndDelete(id);

    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json({ message: 'Group deleted successfully', group: deletedGroup });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete group', error: error.message });
  }
};


