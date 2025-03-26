import User from "../models/user.model.js"

// Get All User
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, message: "Users retrieved successfully", data: users });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve users", error: error.message });
  }
}


// Get User By Id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found with this ID" });
    }

    res.status(200).json({ success: true, message: "User retrieved successfully", data: user });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve user", error: error.message });
  }
}