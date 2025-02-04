import express,{json}  from 'express';
import dotenv from 'dotenv';
import { userauth } from './Routes/userauth.js';
import adminauth from './Routes/adminauth.js';
import cors from 'cors';


dotenv.config();

const app=express();
app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(json())


app.use('/',userauth);
app.use('/',adminauth);

app.get('/',function(req,res){
    res.send("Hello Everyone");
})

app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
    
});

