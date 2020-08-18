    mongoose=require('mongoose'),
    colors =require('colors'),
    comment=require('./comment'),
    post   =require('./post');

var Data=[
    {
        title:'Deep Work',
        image:'https://m.media-amazon.com/images/I/417yjF+Z5zL.jpg',
        description:'One of the most valuable skills in our economy is becoming increasingly rare',
        author:'Cal Newport',
        publish:'2016'
    },
    {
        title:'Everybody Lies',
        image:'https://images-na.ssl-images-amazon.com/images/I/411eYuST7EL._SX324_BO1,204,203,200_.jpg',
        description:"THE NEW YORK TIMES BESTSELLERAN ECONOMIST BOOK OF THE YEARA NEW STATESMAN BOOK OF THE YEAR'This book is about a whole new way of studying the mind",
        author:'Seth Stephens-Davidowitz',
        publish:'2017'
    }
]        
module.exports=function seedDB () {
    comment.remove({},function (err){
            if (err) {
                console.log(err);
                
            } else {
                post.remove({},(err)=>{
                        if (err) {
                            console.log(err);
                            
                        } else {
                            console.log('comment and post are removed correctly '.america);
                            Data.forEach((seed)=>{
                                    post.create(seed,(err,newpost)=>{
                                                if (err) {
                                                    console.log(err);
                                                    
                                                } else {
                                                    comment.create({
                                                        user:'admin',
                                                        content:"Cillum aute nisi qui reprehenderit non et veniam."
                                                    },function (err,newcomment){
                                                        if (err) {
                                                            console.log(err);
                                                            
                                                        } else {
                                                            newpost.comments.push(newcomment);
                                                            newpost.save();
                                                            console.log("one post with admin's comment are added to my DB".inverse);
                                                            
                                                        }
                                                    })
                                                  
                                                    
                                                }
                                    })
                            })
                            
                        }
                })
            }
    })

  }