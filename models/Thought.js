const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: [true, 'Text is required!'],
            maxlength: 280
        },
        username: {
            type: String,
            required: [true, 'Username required!']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: { timestamps: { createdAt: 'created_at' }
            },
        }
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Text is required!'],
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: { timestamps: { createdAt: 'created_at' }
            },
        },
        username: {
            type: String,
            required: [true, 'Username required!']
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;