const Users = require('../models/userModel')
const Posts = require('../models/postModel')
const Appeals = require('../models/appealModel')

const appealCtrl = {
    add: async (req, res) => {
        try {
            const { postId, desription, type } = req.body
            const userFromToken = req.user
            const user = await Users.findOne({_id: userFromToken})
            if(!user) return res.status(400).json({msg: "Данный пользователь не зарегистрирован."})
            
            const post = await Posts.findOne({_id: postId})

            if(!post) return res.status(400).json({msg: "Данный пост не найден."})

            await Appeals.create({
                sender: user.id,
                postId,
                desription,
                type,
            })

            res.json({
                msg: 'Жалоба успешно отправленна!',
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deny: async (req, res) => {
        try {
            const { appealId } = req.body
            const userFromToken = req.user
            if(userFromToken.role !== 'admin') return res.status(400).json({msg: "Ошибка."})

            const appeal = await Appeals.findOne({_id: appealId})
            if(!appeal) return res.status(400).json({msg: "Данный пост не найден."})
            if(appeal.status !== 0) return res.status(400).json({msg: "Уже выполненно."})

            await Appeals.updateOne({
                _id: appealId,
            },{
                status: 2
            })

            res.json({
                msg: 'Успешно отклоненно!',
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    accept: async (req, res) => {
        try {
            const { appealId } = req.body
            const userFromToken = req.user

            if(userFromToken.role !== 'admin') return res.status(400).json({msg: "Ошибка."})

            const appeal = await Appeals.findOne({_id: appealId}).populate('postId')
            if(!appeal) return res.status(400).json({msg: "Данный пост не найден."})
            if(appeal.status !== 0) return res.status(400).json({msg: "Уже выполненно."})

            await Posts.remove({
                _id: appeal.postId._id
            })

            await Appeals.updateOne({
                _id: appealId,
            },{
                status: 1
            })

            res.json({
                msg: 'Успешно!',
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    gets: async (req, res) => {
        try {
            const userFromToken = req.user

            if(userFromToken.role !== 'admin') return res.status(400).json({msg: "Ошибка."})

            const appeals = await Appeals.find({
                status: 0
            });
            if(!appeals) return res.status(400).json({msg: "Постов не найдено."})

            res.json({
                msg: 'Успешно!',
                appeals
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = appealCtrl