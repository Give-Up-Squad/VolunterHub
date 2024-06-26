const { createUser } = require("../models/userModel");
const { createVolunteer } = require("../models/volunteerModel");
const { createOrganisation } = require("../models/organisationModel");
const firebase = require("firebase-admin");

const login = async (req, res) => {
  const idToken = req.body.idToken;
  try {
    const decodedToken = await firebase.auth().verifyIdToken(idToken);
    req.session.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    res.status(200).send("Logged in");
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.status(200).send("Logged out");
  });
};

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

const checkSession = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

const protectedRoute = (req, res) => {
  res.send(`Hello ${req.session.user.email}, this is a protected route!`);
};

module.exports = { login, logout, registerUser, checkSession, protectedRoute };
