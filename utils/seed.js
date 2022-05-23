import { connection } from '../config/connection.js';
import { Thought, User } from '../models/index.js';
import { 
    generateEmail, 
    generateUsername, 
    thoughts,
    reactions,
    randomArrEl
} from './data.js';

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await Thought.deleteMany({});
    await User.deleteMany({});

    const usernames = [];
    let emails = [];
    const reactionObjs = [];
    const thoughtObjs = [];
    const userObjs = [];

    const getReactions = () => {
        const result = [];

        for (let i = 0; i < Math.floor(Math.random() * reactionObjs.length); i++) {
            result.push(...reactionObjs.splice(i, 1));
        }

        return result;
    }

    const getThoughts = (user) => thoughtObjs
        .map(thought => {
            if(thought.username === user) {
                return thought._id;
            }
        })
        .filter(notNull => notNull);

    for (let i = 0; i < 20; i++) {
        let newUsername = generateUsername();

        while (usernames.includes(newUsername)) {
            newUsername = generateUsername();
        }

        let newEmail = generateEmail();

        while (emails.includes(newEmail)) {
            newEmail = generateEmail();
        }

        usernames.push(newUsername);
        emails.push(newEmail);
    }

    for (let i = 0; i < reactions.length; i++) {
        reactionObjs.push({
            reactionBody: reactions[i],
            username: randomArrEl(usernames),
            createdAt: Date.now() - Math.floor(Math.random() * 86400000),
        })
    }

    for (let i = 0; i < thoughts.length; i++) {
        thoughtObjs.push({
            thoughtText: thoughts[i],
            username: randomArrEl(usernames),
            reactions: getReactions(reactionObjs),
            createdAt: Date.now() - Math.floor(Math.random() * 86400000),
        })
    }

    await Thought.collection.insertMany(thoughtObjs);

    for (let i = 0; i < usernames.length; i++) {
        userObjs.push({
            username: usernames[i],
            email: emails[i],
            thoughts: getThoughts(usernames[i]),
        })
    }

    await User.collection.insertMany(userObjs);

    for (let i = 0; i < userObjs.length; i++) {
        const friends = [];

        for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
            const friend = randomArrEl(await User.find({}));
            friends.push(friend._id);
        }

        const user = await User.findOne({username: userObjs[i].username});

        user.friends = friends;

        user.save();
    }

    console.info('Seeding complete!');
    process.exit(0);
});