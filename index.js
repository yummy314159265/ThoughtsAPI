import express from 'express';
import { connection as db } from './config/connection.js';
import { router as routes } from './routes/index.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ThoughtSpeak running on port ${PORT}!`);
    });
});