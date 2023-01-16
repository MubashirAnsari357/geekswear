import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
        if (req.method == 'POST') {
            const { name, email } = req.body
            let user = await User.findOne({ "email": req.body.email })
            let encryptedPass = CryptoJS.AES.encrypt(req.body.password, process.env.NEXT_PUBLIC_AES_SECRET).toString();
            if(user){
                res.status(400).json({ success: false, error: 'User already exists!' })
            }
            else{
                let u = new User({ name, email, password: encryptedPass })
                await u.save();
                res.status(200).json({ success: true, success: 'Account Created successfully!' })
            }
        }
        else {
            res.status(400).json({ success: false, error: 'Oops! Somethings Wrong!' })
        }
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal server error' })
        
    }
    
}

export default connectDb(handler)