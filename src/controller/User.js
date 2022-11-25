const { hashSync, compareSync } = require("bcrypt");
const User = require("../models/User");

//CREATE USER
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = hashSync(password, 10)

    const newUser = new User({ name, email, password: hashedPassword });
    try {
        const saveUser = await newUser.save();
        res.status(201).json({ message: "User Created successfully", saveUser })
    } catch (error) {
        res.status(500).json(error);
    }
}

//UPDATE USER
const updateUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json(error);
    }
}

//DELETE USER
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}

//GET ONE USER
const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

//GET ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

//LOGIN USER 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: "No user found" })
        }
        const isPassword = compareSync(password, existingUser.password)
        if (!isPassword) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        return res.status(200).json({ id: existingUser._id, message: "Login successfully" })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createUser, updateUser, deleteUser, getOneUser, getAllUsers, loginUser };