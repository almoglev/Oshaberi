const { addMsg, getAllMsgs } = require("../controllers/messagesController")

const router = require("express").Router()

router.post("/addmsg", addMsg)
router.post("/getallmsgs", getAllMsgs)


module.exports = router;