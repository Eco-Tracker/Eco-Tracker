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
// const getOneByemail = async (req, res) => {
//     try {
//         prisma.personalUser.findFirst({ where: { mail: req.params.email } }).then((result) => {
//         res.json(result);
//       });
//     } catch (err) {
//       res.json(err);
//     }
//   };

const register = async (req , res)=>{
    try {
        const profissional = await prisma.personalUser.create({
            data: {
                name: req.body.name,
                mail: req.body.mail,
                phone_: req.body.phone_,
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

module.exports = {
    register,
    getOneByName,
    getAllUsers
}