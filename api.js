const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('./controllers/user');
const { addExercise, getLogs } = require('./controllers/exercise');

// post user
router.post('/', createUser);

// get users
router.get('/', getUsers);

// post exercises
router.post('/:_id/exercises', addExercise);

// get logs
router.get('/:_id/logs', getLogs);

module.exports = router
