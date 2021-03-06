const User = require("../model/userModel")
const bcrypt = require("bcrypt")

const ALREADY_IN_USE_ERR = "Username or Email are already in use"
const INCORRECT_CREDENTIALS_ERR = "Username or password are incorrect"

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) {
            return res.json({ msg: ALREADY_IN_USE_ERR, status: false })
        }
        
        const emailCheck = await User.findOne({ email })
        if (emailCheck){
            return res.json({ msg: ALREADY_IN_USE_ERR, status: false })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })
        delete user.password
        return res.json({status: true, user})
    } catch (err) {
        next(err)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        
        // find user by email
        const user = await User.findOne({ email })

        if (!user){
            return res.json({ msg: INCORRECT_CREDENTIALS_ERR, status: false })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if (!isPasswordValid) {
            return res.json({ msg: INCORRECT_CREDENTIALS_ERR, status: false })
        }

        delete user.password

        return res.json({status: true, user})

    } catch (err) {
        next(err)
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id
        const avatarImage = req.body.image
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        })

        return res.json({isSet:userData.isAvatarImageSet, image: avatarImage})
    } catch (err) {
        next(err)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        // select all users, not including the current user id (we don't want to show ourselves as a user in the contacts)
        const users = await User.find({ _id: { $ne:req.params.id } }).select([
            "email", "username", "avatarImage", "_id"
        ])

        return res.json(users)
    } catch (err) {
        next(err)
    }
}