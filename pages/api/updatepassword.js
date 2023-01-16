import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            let token = req.body.token
            let user = jsonwebtoken.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
            let dbuser = await User.findOne({ email: user.email })
            let decrytedPass = CryptoJS.AES.decrypt(dbuser.password, process.env.NEXT_PUBLIC_AES_SECRET).toString(CryptoJS.enc.Utf8)
            if (decrytedPass == req.body.password && req.body.npassword == req.body.cpassword) {
                let encryptedPass = CryptoJS.AES.encrypt(req.body.npassword, process.env.NEXT_PUBLIC_AES_SECRET).toString();
                let dbuseru = await User.findOneAndUpdate({ email: dbuser.email }, { password: encryptedPass })
                res.status(200).json({ success: true, "message": "Successfully updated!" })
                return
            }
            res.status(400).json({ success: false, "message": "Please Enter correct Old password!", cartClear: false })
        }
        else {
            res.status(400).json({ error: 'error' })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

}

export default connectDb(handler)