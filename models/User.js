const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: [true, 'Username is already being used'],
            required: [true, 'Username is required!'],
            trim: true
        },
        email: {
            type: String,
            unique: 'Email is already being used',
            required: 'Email is required',
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [this]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;