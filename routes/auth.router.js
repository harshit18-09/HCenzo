import express from 'express';
import singupHandler from "../controllers/signupController.js";
import loginHandler from "../controllers/loginController.js";

const router = express.Router();

router.route("/register")
    .post(singupHandler)

router.route("/login")
    .post(loginHandler)

export default router;