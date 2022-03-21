const mongoose= require("mongoose")

const commentSchema = new mongoose.User.Schema({
    body: { type:String, required:true},
    bookId: { type:mongoose.Schema.Types.ObjectId, ref:"book", required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref:"user", required: true}
},
{
    timestamps: true
})

const comment = mongoose.model("comment", commentSchema)
module.exports = comment