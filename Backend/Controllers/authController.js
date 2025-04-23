import User from "../Models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
  

export const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		// Validate required fields
		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields including location (area, city, state, country) are required" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Email already exists" });
		}
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		const user = new User({
			name,
			email,
			password: hashedPassword,
		});
		await user.save();
		// Generate JWT Token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

		// Set token in cookies
		res.cookie("jwt-token", token, {
			httpOnly: true,
			maxAge: 3 * 24 * 60 * 60 * 1000,
			sameSite: "None",
			secure: process.env.NODE_ENV === "production",
		});

		res.status(201).json({ 
			data:user,
			token:token,
			 success: true,
			message: "User registered successfully" });

	} catch (error) {
		console.log("Error in signup:", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};


export const login = async function(req,res){
    try {
		const {email, password } = req.body;

		if (!email ||!password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		
		let currUser = await User.findOne({email});
		
		if(!currUser){
			return res.status(401).json({ message: "Invalid credentials" });

		}

		const matchPassword = await bcrypt.compare(password,currUser.password);
		if(!matchPassword){
			return res.status(401).json({ message: "Please Enter Valid Password" });
		}


		const token = jwt.sign({ userId: currUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
		
		
		 res.cookie("jwt-token", token, {
			httpOnly: true, // prevent XSS attack
			
		});

		res.json({
			data:currUser,
			token:token,
			 message: "Welcome Back" });

	} catch (error) {
		console.log("Error in login: ", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
}


export const logout = function(req,res){
    res.clearCookie('jwt-token');
	res.json({ message: "Logged out successfully" });
}


export const getCurrentUser = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		console.error("Error in getCurrentUser controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};


export const getDietPlans = async(req,res)=>{
	try {
		const userId = req.user.id; // Assuming the user ID is available in req.user
	
		// Fetch the user's diet plans from the database
		const user = await User.findById(userId).select('dietPlans');
	
		if (!user) {
		  return res.status(404).json({ message: 'User not found' });
		}
	
		if (!user.dietPlans || user.dietPlans.length === 0) {
		  return res.status(404).json({ message: 'No diet plans found for this user.' });
		}
	
		res.status(200).json(user.dietPlans); // Send diet plans in the response
	  } catch (err) {
		console.error('Error fetching diet plans:', err.message);
		res.status(500).json({ message: 'Server error while fetching diet plans.' });
	  }

}