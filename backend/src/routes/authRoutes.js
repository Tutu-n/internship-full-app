import express from "express";

import {register, login} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register); //endpoint to handle user registration
router.post('/login', login);  //endpoint to handle user login


export default router;