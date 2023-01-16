import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {

    if (req.method == 'POST') {
        for (let i = 0; i < req.body.length; i++) {
            let productfind = await Product.findOne({ slug: req.body[i].slug })
            if (productfind) {
                res.status(400).json({ success: false, error: "Product already exist with the same slug" })
                return
            }
        }
        for (let i = 0; i < req.body.length; i++) {
            let p = new Product({
                slug: req.body[i].slug,
                title: req.body[i].title,
                desc: req.body[i].desc,
                img: req.body[i].img,
                category: req.body[i].category,
                size: req.body[i].size,
                color: req.body[i].color,
                price: req.body[i].price,
                availableQty: req.body[i].availableQty
            })
            await p.save();
            res.status(200).json({ success: true, "message": "Product added successfully" })
        }
    }
    else {
        res.status(400).json({ success: false, error: 'This method is not allowed' })
    }
}
export default connectDb(handler)