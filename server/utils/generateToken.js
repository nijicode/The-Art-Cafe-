import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res) => {
  const token = jwt.sign(
    {
      userId: 1,
    },
    process.env.SECRET,
    { expiresIn: "15d" }
  );

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
