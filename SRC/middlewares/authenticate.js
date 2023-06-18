const jwt=require("jsonwebtoken");
const authConfig= require("../config/auth.json");

module.exports=(req,res,next)=>{
    console.log('middleware');;
    const authHeader=req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({
            error:true,
            message:"Token no provided"
        })
    }
    //Bear
    console.log(authHeader);

    const parts = authHeader.split(" ");

    if(parts.length !==2){
        return res.status(401).json({
            error:true,
            message:"Invalid token type"
        })
    }
    const [scheme, token]=parts;
    
    if(scheme.indexOf("Bearer")!==0){
        return res.status(401).json({
            error:true,
            message:"token malformatted"
        })
    }

   return jwt.verify(token,authConfig.secret,(err, decode)=>{
        
        if(err){
            return res.status(401).json({
                error:true,
                message:"token invalid/expired"
            })
        }

        req.userLogged=decode;

        console.log(err);
        console.log(decode);

        return next();
    } )
}