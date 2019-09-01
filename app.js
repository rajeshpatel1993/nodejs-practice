const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const rootDir = require('./util/path');

const errorController = require('./controllers/error');

const User = require('./models/user');


const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('5d6b665cfa9b074e152a7ce3')
    .then(user => {
        req.user = user;
        
        
        next();} ).catch(err=>console.log(err));
   
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);


mongoose.connect("mongodb+srv://rajesh1:BBKwkffiBUSOo6h6@cluster0-olkcc.mongodb.net/shop?retryWrites=true&w=majority").
then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User(
                {
                    name: 'Rajesh',
                    email: 'rajesh@gmail.com',
                    cart: {
                        items: []
                    }
                }
            );
            user.save();
        }
    })
  

    app.listen(3000);
}).catch(e => console.log(e))

// mongoConnect(() => {
//     app.listen(3000);
// });