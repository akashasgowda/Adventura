import express from 'express';

const router = express.Router();

import { signin as signinController, signup as signupController} from '../controllers/user.js'; 

router.post('/signin',signinController);
router.post('/signup',signupController);

export default router;