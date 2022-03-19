const { addMsg, getAllMsgs } = require("../controllers/messagesController")

const router = require("express").Router()

router.post("/addMsg", addMsg)
router.post("/getAllMsgs", getAllMsgs)


module.exports = router;