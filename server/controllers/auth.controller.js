import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = (req, res) => {
  try {
    const { username, password } = req.body;
    if (username !== process.env.ADMIN || password !== process.env.PASSWORD) {
      console.log("invalid Credentials");
      return res.status(400).json({ error: "invalid Credentials" });
    }
    generateTokenAndSetCookie(res);
    console.log("Login success");
    res.status(201).json({ username, message: "Login Successfully!" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
