const Message = require("../model/messageModel")

module.exports.addMsg = async (req, res, next) => {
    try {
        const { from, to, message } = req.body
        const data = await Message.create({
            message:{text: message},
            users:[from, to],
            sender: from,
        })

        if (data) {
            return res.json({msg:"Message added successfully"})
        } else {
            return res.json({msg:"Failed adding message"})
        }
    } catch (err) {
        next(err)
    }
}

// module.exports.getAllMsgs = async (req, res, next) => {
//     try {
//         const {from, to} = req.body
//         const messages = await Message.find({
//             users: {
//                 $all: [from, to],
//             },
//         }).sort({ updatedAt: 1})

//         const chatMessages = messages.map((msg) => {
//             return {
//                 fromSelf: msg.sender.toString() === from,
//                 message: msg.message.text,
//             }
//         })

//         return res.json(chatMessages)
//     } catch (err) {
//         next(err)
//     }
// }

module.exports.getAllMsgs = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      const messages = await Message.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });

      console.log(from, to, messages)
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      return res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };