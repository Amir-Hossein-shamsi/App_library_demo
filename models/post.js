mongoose=require('mongoose');
var postSchema= ({
    title:String,
    image: {type:String, default:"https://i.dlpng.com/static/png/6926975_preview.png"},
    description: String,
    author:String,
    publish:String,
    created: {type:Date , default:Date.now},
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]

})
module.exports=mongoose.model("Post",postSchema);