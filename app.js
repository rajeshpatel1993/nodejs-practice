const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);


app.use((req,res,next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
   // res.status(404).send('<h1>Page Not Found</h1>');
   res.status(404).render('404',{pageTitle: "404 Page Not found"});
});


// const server = http.createServer(app);

app.listen(3000);
