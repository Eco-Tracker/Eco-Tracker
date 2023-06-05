const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (req,res)=>{
    try{
    const profissionals = await prisma.profissionalUser.findMany();
    res.status(200).json(profissionals)
}
catch(err){
    console.log(err)
     res.status(500).json(err)
}
}
const getOneByName = async (req,res)=>{
    try {
        const names= await prisma.profissionalUser.findMany({ where: { professionamName: req.params.name } })
         res.status(200).json(names)
    }
    catch (err) {
        
         res.status(500).json(err)
    }
}
const getOneByemail = async (req, res) => {
    try {
        prisma.profissionalUser.findFirst({ where: { professionalMail: req.params.email } }).then((result) => {
        res.json(result);
      });
    } catch (err) {
      res.json(err);
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
module.exports = {
    register,
    login,
    getOneByName,
    getOneByemail,
    getAll
}