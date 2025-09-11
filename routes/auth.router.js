import express from 'express';
import singupHandler from "../controllers/signupController.js";
import loginHandler from "../controllers/loginController.js";

const router = express.Router();

router.post("/register", singupHandler);
router.post("/login", loginHandler);

// Add a GET route for testing
router.get("/test", (req, res) => {
    res.json({ message: "Auth router is working" });
});

export default router;