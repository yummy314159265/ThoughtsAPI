import { Router as expressRouter } from 'express';
import { router as userRoutes } from './userRoutes.js';
import { router as thoughtRoutes } from './thoughtRoutes.js'

const router = expressRouter();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export { router };