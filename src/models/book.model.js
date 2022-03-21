const mongoose = require('mongoose')

const bookSchema = new mongoose.UserSchema({
    likes: { type:Number, default: 0,
    enum: { values: [0,1], message:'enter 1 for like and 0 for dislike'}},
    coverImage: { type:String, required:true},
    content: { type:String, required:true},
    publicationId: { type: mongoose.Schema.Types.ObjectId, ref:"user", required:true}
},
{
    timestamps: true
})

const book = mongoose.model("book", bookSchema)
module.exports = book