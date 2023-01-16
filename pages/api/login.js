import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            let user = await User.findOne({ "email": req.body.email })
            const { email, password } = req.body
            let decrytedPass = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_AES_SECRET).toString(CryptoJS.enc.Utf8)
            if (user) {
                if (email == user.email && password == decrytedPass) {
                    var token = jwt.sign({ email: user.email, name: user.name }, process.env.NEXT_PUBLIC_JWT_SECRET , { expiresIn: '2d' });
                    res.status(200).json({ success: true, success: "You are successfully logged in!", token, email: user.email })
                }
                else{
                    res.status(400).json({ success: false, error: "Invalid Credentials"} )
                }
            }
            else{
                res.status(400).json({ success: false, error: "No user found"} )
            }
        }
        else {
            res.status(400).json({ error: 'This method is not allowed' })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
}

export default connectDb(handler)