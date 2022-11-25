const Task = require("../models/Task");
const User = require("../models/User");
const { connection, Conn } = require('../connection/dbConnection');


//CREATE TASKS
const createTask = async (req, res) => {
    const { title, description, date, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error);
    }
    if (!existingUser) {
        return res.status(404).json({ messsag: "User not found" });
    }
    let postTask;
    console.log(postTask);
    try {
        postTask = new Task({ title, description, date: new Date(`${date}`), user, });
        console.log(postTask);
        console.log("postTaskasdasd");


        // const session = await connection.startSession();
        // session.startTransaction();
        // await MySchema.create({
        //     value: "Created?",
        //     session: session, // giving session here
        // });
        // await session.commitTransaction();
        // session.endSession();


        const connection = await Conn();
        console.log(connection);

        const session = await connection.startSession();
        session.startTransaction();
        console.log("session");

        existingUser.tasks.push(postTask);
        await existingUser.save({ session })
        postTask = await postTask.save({ session });
        console.log(postTask);
        await session.commitTransaction();
        console.log(postTask);
        return res.status(201).json({ messsag: "Task Created", postTask });
    } catch (error) {
        return res.status(500).json({ message: "error from creat task", error });
    }
}

///UPDATE TASKS
const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ messsag: "Task Updated", updatedTask });
    } catch (error) {
        res.status(500).json(error)
    }
};

/// DELETE TASKS
const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({ messsag: "Taks Deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
};

///GET ONE TASKS
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).json({ messsag: "Task Found", task });
    } catch (error) {
        res.status(500).json(error)
    }
};

///GET ALL TASKS
const getAllTasks = async (req, res) => {
    try {
        const allTask = await Task.find();
        res.status(200).json(allTask);
    } catch (error) {
        res.status(500).json(error)
    }
};

module.exports = { createTask, updateTask, deleteTask, getTask, getAllTasks }