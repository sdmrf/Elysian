// Imports
import express from 'express';

// Instance of router
const router = express.Router();

// Importing the controller
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';

// Routes
router.get('/getUsers', getUsers);
router.get('/getUser/:id', getUser);
router.post('/register', createUser);
router.post('/login', createUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

// Exporting the router
export default router