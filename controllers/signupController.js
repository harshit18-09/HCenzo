import CryptoJS from "crypto-js";
import User from '../model/user.model.js';



const signupHandler = async (req, res) => {
        try {
            // Check if user with email or number already exists
            const existingUser = await User.findOne({
                $or: [
                    { email: req.body.email },
                    { number: req.body.number }
                ]
            });

            if (existingUser) {
                return res.status(400).json({ 
                    message: "User with this email or phone number already exists" 
                });
            }

            // Validate required fields
            if (!req.body.username || !req.body.number || !req.body.email || !req.body.password) {
                return res.status(400).json({ 
                    message: "All fields (username, number, email, password) are required" 
                });
            }

            if (!process.env.PASSWORD_SECRET_KEY) {
                return res.status(500).json({ 
                    message: "Server configuration error: Missing encryption key" 
                });
            }

            const newUser = new User({
                username: req.body.username,
                number: req.body.number,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString()
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch(e) {
            console.error("Signup Error:", e);
            
            if (e.name === 'ValidationError') {
                return res.status(400).json({ 
                    message: "Validation Error", 
                    details: e.message 
                });
            }
            
            if (e.code === 11000) {
                return res.status(400).json({ 
                    message: "User with this email or phone number already exists" 
                });
            }

            res.status(500).json({ 
                message: "Server Error in Creating a user",
                error: e.message
            });
        }
    };

export default signupHandler;