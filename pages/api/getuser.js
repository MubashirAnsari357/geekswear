import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    try {
        if(req.method == 'POST'){
            let token = req.body.token
            let user = jsonwebtoken.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
            let dbuser = await User.findOne({email: user.email})
            const { name, email, phone, address, pincode } = dbuser
            res.status(200).json({ name, email, phone, address, pincode })
    
        }
        else{
            res.status(400).json({ error: 'error' })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")       
    }
    
}

export default connectDb(handler)