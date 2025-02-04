import { Router } from "express";
import  authenticate  from "../middleware/auth.js";
import adminCheck from "../middleware/adminCheck.js";

const adminauth=Router();
const Book = new Map();
adminauth.post('/addBook',authenticate,adminCheck,(req,res)=>{   //authentication is amiddleware
    try{
        
            const {BookName,BookId,AuthorName,IssueDate,NumberOfCopies}= req.body;
            if(Book.get(BookName)){
                res.status(400).send("Bad request");
            }
            else{
                Book.set(BookName,{BookId,AuthorName,IssueDate,NumberOfCopies});
                res.status(201).send("Book added")
                console.log(Book.get(BookName));
            }
       
        
    }
    catch{
        res.status(500).send("Internal Server Error")

    }
});

adminauth.get('/getBook',(req,res)=>{
    
    try{
        const name = req.query.BookName;
        console.log(name);
        const result= Book.get(name)
        console.log(result);
        
         if(result){
            console.log(result)
            res.status(200).json({data:result})
        }
        else{
        res.status(404).json({message:"Book not found"})
        }
    }
    catch{
        res.status(500).send("Internal Server Error")

    }
})


adminauth.patch('/updateBook',authenticate,adminCheck,(req,res)=>{
    try{
        
            const{BookName,NumberOfCopies}=req.body;
            const result=Book.get(BookName);
            console.log(result);
            if(result){
                Book.set(BookName,{BookId:result.BookId,AuthorName:result.AuthorName,IssueDate:result.IssueDate,NumberOfCopies});
                console.log(Book.get(BookName))
                res.status(201).send("Updated successfuly")
           
        }
    }
    catch{
         res.status(500).send("server Error")     
        }
})


adminauth.delete('/deleteBook',authenticate,adminCheck,(req,res)=>{
    try{
        const {BookName} = req.body;
        console.log(BookName);
        if(Book.get(BookName)){
            Book.delete(BookName);
            res.status(200).send("successfully deleted")
        }
        else{
            res.status(404).json({msg:"Book not found"})
        }
    }
    catch{
        res.status(500).send("server Error")
    }

})
export default adminauth