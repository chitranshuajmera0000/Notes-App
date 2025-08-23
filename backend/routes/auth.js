// GitHub OAuth
import { Router } from "express";
import passport from "passport";

const router = Router();



router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login",
        session: true,
    }),
    (req, res) => {
        res.redirect(process.env.FRONTEND_URL);
    }
);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: true,
    }),
    (req, res) => {
        // Redirect to frontend after successful login
        res.redirect(process.env.FRONTEND_URL);
    }
);

router.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.clearCookie("connect.sid"); // Optional: clear the session cookie
            res.json({ message: "Logout successful" });
        });
    });
});

router.get("/user", (req, res) => {
    console.log("Auth user route hit. req.user:", req.user);
    res.json(req.user || null);
});

// Health check endpoint
router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

export default router;