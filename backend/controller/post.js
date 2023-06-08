const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (req,res)=>{
    try{
    const manyPosts = await prisma.posts.findMany();
    res.status(200).json(manyPosts)
}
catch(err){
    console.log(err)
     res.status(500).json(err)
}
}


const getOneByTitle = async (req,res)=>{
    try {
        const titles= await prisma.posts.findMany({ where: { title: req.params.title } })
         res.status(200).json(titles)
    }
    catch (err) {
        
         res.status(500).json(err)
    }
}


const deleteOneByTitle = async (req, res) => {
    try {
        const deletedPosts = await prisma.posts.deleteMany({ where: { title: req.params.title } });
        res.status(200).json(deletedPosts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const updateOneByTitle = async (req, res) => {
    try {
        const updatedPost = await prisma.posts.update({  
            where: { post_Id: req.params.post_Id },
            data: { 
                type: req.body.type,
                title: req.body.title,
                body: req.body.body,
                image: req.body.image,
                like: req.body.like
            }
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}




const register = async (req , res)=>{
    try {
        const posst = await prisma.posts.create({
            data: {
                type: req.body.type,
                title: req.body.title,
                body: req.body.body,
                image: req.body.image,
                like:req.body.like,
                author:{
                    connect:{id:req.body.id}
                  }
            }
        })
         res.status(201).json(posst)           
    }
    catch (err) {
        console.log(err)
         res.status(500).json(err)
    }

}

module.exports = {
    register,
    getOneByTitle,
    getAll,
    deleteOneByTitle,
    updateOneByTitle
}