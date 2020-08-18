const   bodyParser=require('body-parser'),
        mongoose=require('mongoose'),
        express = require('express'),
        passport=require('passport'),
        localStrategy=require('passport-local'),
        User=require('./models/user'),
        methodOverride =require('method-override'),
        comment=require('./models/comment'),
        post=require('./models/post.js'),
        seedDB=require('./models/seedDB.js'),
        colors=require('colors');
        
var path= require('path');
const pathnew=path.join(__dirname,"views/public");
app = express();
app.use(express.static(pathnew));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/liberally', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
seedDB();
//...................passport config..........................
app.use(require('express-session')({
    secret:'My name is AmirHossein and i wanna say this life is awesome',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req,res,next) {
    res.locals.thisuser=req.user;
    next();
  });
  
//.............................End of passport config............................
//........auth...........

//register
app.get('/register',function (req,res) {
    res.render('pages/authentication/register');

});
app.post('/register',function (req,res) {
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function (err,user) {
        if (err) {
            console.log(err);
            return  res.render('pages/athentication/register');
        } 
         console.log('registered'.yellow);
         passport.authenticate('local')(req,res,function () {
                res.redirect('/library');
              });
            
        

      });
  });
  //login
  app.get('/login', (req, res) => {
      res.render('pages/authentication/login');
  });

app.post('/login', passport.authenticate('local',{
    successRedirect:'/library',
    failureRedirect:'/login'
}),(req,res)=>{


});
//logout
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/library');
});

//.......____>>>>.....
//................Main Routes........................
app.get('/', (req, res) => {
   res.render('pages/main/intro');
});

app.get('/library', (req, res) => {
    console.log(req.user);
    console.log(req.post);
    
    post.find({},function (err,books) {
        if (err) {
            
        } else {
            console.log("_____index____".america);
            res.render("pages/main/index",{books:books});
        }
    });
});

app.get('/library/create',isLoggedIn, (req, res) => {
    res.render("pages/main/create")
});

app.post('/library', (req, res) => {
    post.create(req.body.book,function (err,post) {
        if (err) {
            console.log(err);
            res.render('pages/main/create');
            
        } else {
            console.log('new post added thank you'.america);
            res.redirect('/library');
        }
      });
});

app.get('/library/:id',isLoggedIn,(req, res) => {
    post.findById(req.params.id).populate('comments').exec(function (err,foundData) { 
        if (err) {
            console.log(err);
            
        } else {
            res.render('pages/main/show',{book:foundData});
            console.log("_________________________".bgWhite+User.user);
            
            console.log("________show________".blue);

        }
     });
    
   
});

app.get('/library/:id/edit', (req, res) => {
    res.send("Hi i'm here ")
});

app.put('/library/:id', (req, res) => {
    res.send("Hi i'm here ")
});

//...............END  ...........................
//...............COMMENTS ROUTES...................
app.get('/library/:id/comment/create',isLoggedIn, (req, res) => {
    post.findById(req.params.id,function (err,foundedpost) {
        if (err) {
            console.log(err);
            
        } else {
            res.render('pages/comments/create',{post:foundedpost});
            console.log('_______comment form_________'.bgBlue);
            
        }
    })
    
});
app.post('/library/:id/comment', (req, res) => {
    post.findById(req.params.id,function (err,fpost) { 
        if (err) {
            console.log(err);
            
        } else {
            comment.create(req.body.comment,function (err,comment) {
                if (err) {
                    console.log(err);
                    
                } else {
                    fpost.comments.push(comment);
                    fpost.save();
                    console.log('new comment added to specefic post'.green);
                    res.redirect('/library');
                    
                }
              })
        }
     })
});
//.............END...............................






function isLoggedIn(req,res,next)
{
    if (req.isAuthenticated()) {
        return  next();
    }
     res.redirect('/login');
}









app.listen(3000, () => {
    console.log('Example app listening on port port!');
});

