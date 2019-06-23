exports.get404 = (req,res,next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
   // res.status(404).send('<h1>Page Not Found</h1>');
   res.status(404).render('404',{pageTitle: "404 Page Not found", path: ''});
}