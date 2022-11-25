const express = require('express');
const { createTask, updateTask, deleteTask, getTask, getAllTasks } = require('../controller/Task');

const router = express.Router()

//CREATE TASK
router.post('/posttask', createTask);

//UPDATE TASK
router.put('/:id', updateTask);

//DELETE TASK
router.delete('/:id', deleteTask);

//GET ONE TASK
router.get('/:id', getTask);

//GET ALL TASK
router.get('/', getAllTasks);

module.exports = router 