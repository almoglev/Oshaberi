const messageModel = require("../model/messageModel")

module.exports.addMsg = async (req, res, next) => {
    try {
        const { from, to, message } = req.body
        const data = await messageModel.create({
            message:{text: message},
            users:[from, to],
            sender: from,
        })

        if (data) {
            return res.json({msg:"Meesage added successfully"})
        } else {
            return res.json({msg:"Failed adding message"})
        }
    } catch (err) {
        next(err)
    }
}

module.exports.getAllMsgs = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}