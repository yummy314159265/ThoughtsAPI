import { Router as expressRouter } from 'express';
import { router as apiRoutes } from './api/index.js'; 

const router = expressRouter();

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

export { router };