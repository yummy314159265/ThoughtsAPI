import mg from 'mongoose';
const { connect, connection } = mg;

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughtsDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export { connection };