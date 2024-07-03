const { createUser } = require("../models/userModel");

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

module.exports = { registerUser };
