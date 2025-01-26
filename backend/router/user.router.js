import express from 'express';
import {addUser, updateUser, deleteUser, findUser, userLogin, userLogout} from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/addUser', addUser);
router.put('/updateUser/:userID', updateUser);
router.delete('/deleteUser/:userID', deleteUser);
router.get('/findUser/:userID', findUser);
router.post('/login', userLogin);
router.post('/logout', userLogout);

export default router;