const mongoose= require("../database");
//Lucas esteve aqui
const bcryptjs=require("bcryptjs");

const UserSchema= new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },  
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    createAt:{
        type: Date,
        default: Date.now 
    }
});

UserSchema.pre("save", async function(next){
    const hash= await bcryptjs.hash(this.password,10);
    console.log(this);
    console.log(hash);
    this.password=hash;
})

const User=mongoose.model("User",UserSchema);

module.exports=User;
