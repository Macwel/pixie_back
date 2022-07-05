const mongoose = require('mongoose')


const appealSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    postId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'post'
    },
    desription: {type: String, default: ''},
    type: {type: String, default: ''},
    status: {type: Number, default: 0},
}, {
    timestamps: true
})


module.exports = mongoose.model('appeal', appealSchema)