import express from "express";
import cors from "cors";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import "./passport.js"; // import your passport config


const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

app.set('trust proxy', 1); // trust first proxy

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none", // required for cross-origin
            secure: true      // required for HTTPS
        },
    })
);


app.use(passport.initialize());
app.use(passport.session());


// Import and mount the main router
import { router } from "./routes/index.js";
app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});