import { Router as expressRouter } from 'express';
import { 
    addFriend,
    createUser, 
    deleteFriend, 
    deleteUser, 
    getSingleUser, 
    getUsers, 
    updateUser 
} from '../../controllers/userController.js';

const router = expressRouter();

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

export { router };