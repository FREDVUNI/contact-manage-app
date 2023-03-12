import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:true,
        unique:true
    },
},{timestamps:true})

const Category = mongoose.model("categories",categorySchema)
export default Category