// Запросим библиотеку mongoose
const mongoose = require('mongoose');

// Определаем схему БД заметки
const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            require: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        favoriteBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }
);

// Определяем модель 'Note' со схемой
const Note = mongoose.model('Note', noteSchema);

// Экспортируем модуль
module.exports = Note;