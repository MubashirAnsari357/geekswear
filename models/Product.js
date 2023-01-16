const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    slug: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    desc: {type: String, required: true},
    img: {type: String},
    category: {type: String, required: true},
    size: {type: String},
    color: {type: String},
    price: {type: Number, required: true},
    availableQty: {type: Number, required: true},

  }, {timestamps: true});

  export default mongoose.models.Product || mongoose.model("Product", ProductSchema);