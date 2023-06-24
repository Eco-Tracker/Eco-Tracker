const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllUsers = async (req,res)=>{
    try{
    const user = await prisma.personalUser.findMany();
    res.status(200).json(user)
}
catch(err){
    console.log(err)
     res.status(500).json(err)
}

}
const getOneByName = async (req,res)=>{
    try {
        const names= await prisma.personalUser.findMany({ where: { name: req.params.name } })
         res.status(200).json(names)
    }
    catch (err) {
        
         res.status(500).json(err)
    }
}

const getOneById = async (req, res) => {
    try {
       const one= await prisma.personalUser.findMany({ where: { id: req.params.id } })
        res.status(200).json(one);
    
    } catch (err) {
      res.status(500).json(err);
    }
  };

const register = async (req , res)=>{
    try {
        const profissional = await prisma.personalUser.create({
            data: {
                name: req.body.name,
                mail: req.body.mail,
                phone: req.body.phone,
                photo: req.body.photo,
         
            }
        })
         res.status(201).json(profissional)           
    }
    catch (err) {
        console.log(err)
         res.status(500).json(err)
    }

}
const updateUser = async(req,res)=>{
    try {
        const user = await prisma.personalUser.update({
            where: { id: req.params.id },
        data: {
                name: req.body.name,
                mail: req.body.mail,
                phone: req.body.phone,
                photo: req.body.photo,
        },
        })
        res.status(200).json(user)
    }
    catch (err) {
         res.status(500).json(err)
    }
}
const deleteUser = async (req, res) => {
    
    try {
        const user = await prisma.personalUser.delete({
            where: { id : req.params.id }
        })
         res.status(200).json(user)
    }
    catch (err) {
         res.status(500).json("from back")
    }
}
const getOneByemail = async (req,res)=>{
    try {
        const mails= await prisma.personalUser.findMany({ where: { mail: req.params.mail } })
         res.status(200).json(mails)
    }
    catch (err) {
        
         res.status(500).json(err)
    }
}
const bannUser = async (req, res)=> {
    try{
       
        const bann=await prisma.personalUser.update({where:{ id: req.params.id},data:{banned:req.body.banned}})
        res.status(204).json(bann)
    }
    catch (err) {
        
        res.status(500).json(err)
   }
}
module.exports = {
    getOneByemail,
    register,
    getOneByName,
    getAllUsers,
    getOneById,
    deleteUser,
    updateUser,
    bannUser,

}