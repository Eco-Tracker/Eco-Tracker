const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (req,res)=>{
    try{
    const comments = await prisma.comments.findMany()
    res.status(200).json(comments)
} 
catch(err){
    console.log(err)
     res.status(500).json(err)
}
}
const getOneComment = async (req,res)=>{
    try {
        const comment= await prisma.comments.findMany({ where: { post_Id: req.params.post_Id } })
         res.status(200).json(comment)
    }
    catch (err) {
        
         res.status(500).json(err)
    }
}


const add = async (req , res)=>{
    try {
        const comment = await prisma.comments.create({
            data: {
                bodyCom: req.body.bodyCom,
                posts: {
                    connect: { post_Id: req.body.post_Id },
                },
                author:{
                    connect:{id:req.body.id}
                }
            }
        })
         res.status(201).json(comment)           
    }
    catch (err) {
        console.log(err)
         res.status(500).json(err)
    }

}
const update = async (req, res) => {
    try {
      const comment = await prisma.comments.update({
        where: { id: req.params.id },
        data: {
            bodyCom: req.body.bodyCom

        },
      });
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
const deleteComment = async (req, res) => {
    
    try {
        const comment = await prisma.comments.delete({
            where: { id: req.params.id }
        })
         res.status(200).json(comment)
    }
    catch (err) {
         res.status(500).json(err)
    }
}

module.exports = {
    add,
    update,
    getAll, 
    deleteComment,
    getOneComment
}