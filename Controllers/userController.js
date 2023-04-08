const userModel = require("../Models/userModel");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
    try{
        const {name, email,occupation, Physical_Actives, age, food_intake, sleeping_hours } = req.body;

        let user = await userModel.findOne({ email });
        if (user) return res.status(400).json("User already exists...");
        if (!name || !email || !occupation || !Physical_Actives || !age || !food_intake || !sleeping_hours)
            return res.status(400).json("All fields are required...");
        if (!validator.isEmail(email))
            return res.status(400).json("Email must be a valid email...");
        user = new userModel({name, email,occupation, Physical_Actives, age, food_intake,sleeping_hours});
        await user.save();

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name,email,occupation, Physical_Actives, age, food_intake,sleeping_hours, token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
const findUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {registerUser, findUser,getUsers};