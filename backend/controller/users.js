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
         res.status(500).json(err)
    }
}

module.exports = {
    register,
    getOneByName,
    getAllUsers,
    getOneById,
    deleteUser,
    updateUser
}