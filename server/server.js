import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoute from "./routes/auth.route.js";
import categoryRoute from "./routes/category.route.js";
import itemRoute from "./routes/item.route.js";
import heroRoute from "./routes/hero.route.js";
import offersRoute from "./routes/offers.route.js";
import historyRoute from "./routes/history.route.js";
import testimonialRoute from "./routes/testimonial.route.js";

import connectToDb from "./db/connectToDb.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/item", itemRoute);
app.use("/api/hero", heroRoute);
app.use("/api/history", historyRoute);
app.use("/api/offers", offersRoute);
app.use("/api/testimonial", testimonialRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToDb();
  console.log(`Server running on port ${PORT}`);
});
