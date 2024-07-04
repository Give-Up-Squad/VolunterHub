const { createUser, getUserByEmail } = require("../models/userModel");

const registerUser = async (req, res) => {
  const {
    username,
    email,
    is_garda_vetted,
    roles,
    dob,
    forename,
    surname,
    org_name,
  } = req.body;

  try {
    const user = await createUser(
      username,
      email,
      is_garda_vetted,
      roles,
      dob,
      forename,
      surname,
      org_name
    );

    res
      .status(201)
      .json({ message: "User registered and logged in successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const displayUser = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await getUserByEmail(email);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error displaying user:", error.message);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

module.exports = { registerUser, displayUser };
