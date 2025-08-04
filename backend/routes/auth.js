import { Router } from "express";
import passport from "passport";

const router = Router();

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
        // return res.json({
        //     message: "Login successful",
        //     user: req.user,
        // });
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
    res.json(req.user || null);
});

export default router;