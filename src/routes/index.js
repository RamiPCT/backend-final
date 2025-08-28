import { Router } from 'express';
import sessionRouter from './session.routes.js';
import userRouter from './user.routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/sessions', sessionRouter);

export default router;