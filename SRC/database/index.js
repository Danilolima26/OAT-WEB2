const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://alveslucas896:Teste@cluster0.qsr1tgt.mongodb.net/Cluster0?retryWrites=true&w=majority",{},(error)=>{
    if(error){
        console.log('falha para utenticar');
        console.log(error);
        return;
    }
    console.log('conexão estavel com mongo');
})

mongoose.Promise=global.Promise;

module.exports=mongoose;