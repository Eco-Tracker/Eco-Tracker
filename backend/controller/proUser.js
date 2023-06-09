const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (req,res)=>{
    try{
    const profissionals = await prisma.profissionalUser.findMany()
    res.status(200).json(profissionals)
}
catch(err){
    console.log(err)
     res.status(500).json(err)
}
}
const getOneByName = async (req,res)=>{
    console.log(req.params,"test")
    try {
        const names= await prisma.profissionalUser.findMany({ where: { professionalName: req.params.name } })
         res.status(200).json(names)
    }  
    catch (err) {
        
         res.status(500).json(err)
    }
}
const getOneByemail = async (req, res) => {
    try {
        const one = await prisma.profissionalUser.findFirst({ where: { professionalMail: req.params.professionalMail } })
        res.status(200).json(one);
    } catch (err) {
        res.status(500).json(err)
    }
  };
  const getOneById = async (req, res) => {
    try {
       const one= await prisma.profissionalUser.findUnique({ where: { id: req.params.id } })
        res.status(200).json(one);
    
    } catch (err) {
        res.status(500).json(err)
    }
  };

const register = async (req , res)=>{
    try {
        const profissional = await prisma.profissionalUser.create({
            data: {
                professionalName: req.body.professionalName,
                professionalMail: req.body.professionalMail,
                contactNumber: req.body.contactNumber,
                codeFiscal: req.body.codeFiscal,
                picture: req.body.picture,
            }
        })
         res.status(201).json(profissional)           
    }
    catch (err) {
        console.log(err)
         res.status(500).json(err)
    }

}
const login = async (req, res) => {
    try {
        const profissional = await prisma.profissionalUser.create({
            professionalMail: req.body.professionalMail,
        })
         res.status(201).json(profissional)
    }
    catch (err) {
         res.status(500).json(err)
    }
}

const updatePro = async(req,res)=>{
    try {
        const profissional = await prisma.profissionalUser.update({
            where: { id: req.params.id },
        data: {
            professionalName: req.body.professionalName,
            professionalMail: req.body.professionalMail,
            contactNumber: req.body.contactNumber,
            codeFiscal: req.body.codeFiscal,
            picture: req.body.picture,
        },
        })
        res.status(200).json(profissional)
    }
    catch (err) {
         res.status(500).json(err)
    }
}
const deletePro = async (req, res) => {
    
    try {
        const profissional = await prisma.profissionalUser.delete({
            where: { id : req.params.id }
        })
         res.status(200).json(profissional)
    }
    catch (err) {
         res.status(500).json(err)
    }
}
const bannUser = async (req, res)=> {
    try{
       
        const bann=await prisma.profissionalUser.update({where:{ id: req.params.id},data:{banned:req.body.banned}})
        res.status(204).json(bann)
    }
    catch (err) {
        
        res.status(500).json(err)
   }
}

module.exports = {
    register,
    login,
    getOneByName,
    getOneByemail,
    getAll,
    updatePro,
    deletePro,
    getOneById,
    bannUser
}