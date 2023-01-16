import Forgot from "../../models/Forgot"
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    if (req.body.sendMail==true) {
        let forgot = new Forgot({
            email: req.body.email,
            // token: token
        })

        let dbuser = await User.findOne({ email: req.body.email })
        if(dbuser){        
            let token = 'fdsjfhsajfhsofh2o3r332242rfgdsg'
            let email = `Please click on the link to reset your password
            <a href='http://localhost:3000/forgot?token=${token}'>Click me!</a>`
    
            res.status(200).json({ success: true, "message": "Password reset link has been sent to your registered email id" })
        }
        else{
            res.status(400).json({ success: false, "message": "Please enter registered email!" })
        }

    }
    else{
        try {
            if (req.method == 'POST') {
                if (req.body.password == req.body.cpassword) {
                    let encryptedPass = CryptoJS.AES.encrypt(req.body.password, process.env.NEXT_PUBLIC_AES_SECRET).toString();
                    await User.findOneAndUpdate({ email: req.body.email }, { password: encryptedPass })
                    res.status(200).json({ success: true, "message": "Successfully updated!" })
                    return
                }
            }
            else {
                res.status(400).json({ error: 'error' })
            }
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error")
        }
    }


}

export default connectDb(handler)