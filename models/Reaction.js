import mg from 'mongoose';
import { formatDate } from '../utils/helpers.js';

const { Schema, Types } = mg;

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
    }
);

export { reactionSchema };