import jwt from 'jsonwebtoken';
import dotevn from 'dotenv';
dotevn.config()
const authenticate=(req,res,next)=>{
    
    const cookie =req.headers.cookie;
    console.log(cookie);
    const cookies = cookie.split(';');
    for(let cooki of cookies){
        const [name,token]= cooki.trim().split('=');
        if(name=='kanya'){
            console.log(token);
            const verified=jwt.verify(token,process.env.SECRET_KEY);
            const data =jwt.decode(token)
            
            console.log(verified);
            console.log(verified.UserName);
            
            req.username=verified.UserName;
            req.userrole=verified.UserRole;
            next();
            break;
        }
    }
    // if(cookie){
    //     const [name,token]= cookie.trim().split('=');
    //     console.log(name);
    //     console.log(token);
    //     if(name=='kanya'){
    //         const verified=jwt.verify(token,process.env.SECRET_KEY);
    //         console.log(verified);
    //         req.User =verified.UserName;
    //         req.role =verified.UserRole;
    //         next();//for move to the next function don't stop at the authentaicate function
    //     }
    //     else{
    //         res.status(401).send("Unauthorized User")
    //     }
    // }
    // else{
    //     res.status(401).send("please signup")
    // }
}
 export default authenticate