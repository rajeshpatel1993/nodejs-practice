const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data','products.json');

const getProductFromFile = cb => {
    
    fs.readFile(p,(err,fileContent) => {
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }

        
    });

}

module.exports = class Product{
    constructor(t){
        this.title = t;
    }


    save(){
        // const p = path.join(path.dirname(process.mainModule.filename), 'data','products.json');
        // fs.readFile(p, (err,fileContent) => {
        //     let products = [];
        //     if(!err){
        //         products = JSON.parse(fileContent);
        //     }
        //     products.push(this);
        //     fs.writeFile(p, JSON.stringify(products), (err) => {
        //         console.log(err);
        //     });

        //     console.log(fileContent);
        // });
        // products.push(this);

        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(p,JSON.stringify(products), err => {
                console.log(err);
            });
        })
    }

    static fetchAll(cb){
       
        getProductFromFile(cb);
    }

}