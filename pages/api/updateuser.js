import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    try {
        if(req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))){
            res.status(400).json({success: false , "message": "Please Enter your 10 digit phone number!", cartClear: false})
            return
        }
        if(req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))){
            res.status(400).json({success: false , "message": "Please Enter your 6 digit Pincode!", cartClear: false})
            return
        }
        if (req.method == 'POST') {
            let token = req.body.token
            let user = jsonwebtoken.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
            let dbuser = await User.findOneAndUpdate({ email: req.body.email }, { name: req.body.name, phone: req.body.phone, address: req.body.address, pincode: req.body.pincode })
            res.status(200).json({ success: true, "message": "Successfully updated!" })

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