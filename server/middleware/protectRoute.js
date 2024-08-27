import jwt from "jsonwebtoken";

const protectRoute = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provider" });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    next();
  } catch (error) {
    console.log("Error in protectRoute controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export default protectRoute;
