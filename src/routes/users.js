const express = require('express');
const { createUser, updateUser, deleteUser, getOneUser, getAllUsers, loginUser } = require('../controller/User.js');

const router = express.Router();

//CREATE
router.post('/', createUser);

//UPDATE
router.put('/:id', updateUser);

//DELETE
router.delete('/:id', deleteUser);

//GET 
router.get('/:id', getOneUser);

//GET ALL
router.get('/', getAllUsers);

//LOGIN
router.post('/login', loginUser);

module.exports = router;