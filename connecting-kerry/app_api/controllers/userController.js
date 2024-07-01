const { createUser } = require("../models/userModel");
const { createVolunteer } = require("../models/volunteerModel");
const { createOrganisation } = require("../models/organisationModel");

const registerUser = async (req, res) => {
  const { username, email, password, isGardaVetted, roles, extraData } =
    req.body;

  try {
    const user = await createUser(
      username,
      email,
      password,
      isGardaVetted,
      roles
    );
    // if (roles === "volunteer") {
    //   await createVolunteer(
    //     user.user_id,
    //     extraData.fileUrl,
    //     extraData.gender,
    //     extraData.dob,
    //     extraData.forename,
    //     extraData.surname
    //   );
    // } else if (roles === "organisation") {
    //   await createOrganisation(
    //     user.user_id,
    //     extraData.orgName,
    //     extraData.fileUrl
    //   );
    // }

    // Create session for the user
    req.session.user = {
      uid: user.user_id,
      email: email,
    };

    res
      .status(201)
      .json({ message: "User registered and logged in successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };
