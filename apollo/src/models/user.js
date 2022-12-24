// Запросим библиотеку mongoose
const mongoose = require('mongoose');

// Определаем схему БД заметки
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            index: { unique: true }
        },
        email: {
            type: String,
            require: true,
            index: { unique: true }
        },
        password: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;