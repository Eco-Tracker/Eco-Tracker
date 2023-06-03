import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
const comments = await prisma.comments.create({
    data: {
      
        bodyCom: 'sabrin',
        id: 28
    },
  })
console.log(comments)    
}

main() 
.catch(err => {console.error(err.message)
})
.finally (async () => {
    await prisma.$disconnect()
}) 




// const users = prisma.profissionalUser;

// const getAll = async (req,res)=>{
//     try{
//     const profissionals = await users.findMany();
//     res.status(200).json(profissionals)
// }
// catch(err){
//     console.log(err)
//      res.status(500).json(err)
// }
// }
