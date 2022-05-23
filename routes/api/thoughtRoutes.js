import { Router as expressRouter } from 'express';
import { 
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} from '../../controllers/thoughtController.js';

const router = expressRouter();

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

export { router };