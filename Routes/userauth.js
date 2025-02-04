import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
// import  authenticate  from "../middleware/auth.js";

const userauth=Router();


const user = new Map();
// const course = new Map();
userauth.post('/signup',async(req,res)=>{  //req-geting a request from the user
    
   try{ 
    const data= req.body;
    //console.log(data);
    const{FirstName,LastName,UserName,password,UserRole}=req.body;
    console.log(FirstName)
    //user.set(UserName,{FirstName,LastName,password});
     console.log(user.get("Kanya_03"));
     const newpassword=await bcrypt.hash(password,10);
     console.log(newpassword);
    
    if(user.get(UserName))
    {
        res.status(400).send("This user name Already exists") //send a respons to the user status is a status code 400 means bad request
    }
    else{
        user.set(UserName,{FirstName,LastName,password:newpassword,UserRole});
        res.status(201).send("Sign up successfully")//status code 201 successfully created
        
    }
    console.log(user.get("Kanya_03"));
}
catch{
    res.status(500).send("Internal Server Error")
}
})

userauth.post('/login',async(req,res)=>{
    try{
        const{UserName,password}=req.body;
        const result= user.get(UserName);
        if(!result){
            res.status(400).send("Invaild User name");
        }
        else
        {
            console.log(result.password);
            const valid=await bcrypt.compare(password,result.password);
            console.log(valid);
            if(valid){
                const token= jwt.sign({UserName:UserName,UserRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'2hr'});
                console.log(token);
                res.cookie('kanya',token,
                {
                    httpOnly:true

                });
                
                res.status(200).send("logged in successfuly");
            }
            else{
                res.status(401).send("Unauthorized access");
            }
        }
    }
    catch{
        res.status(500).send("Internal Server Error")

    }
})

userauth.get('/logout',(req,res)=>{
    res.clearCookie('kanya');
    res.status(200).send("successfuly logout")
})

export{userauth}