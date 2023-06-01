import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
const comments = await prisma.comments.findMany()
console.log(comments)    
}

main() 
.catch(err => {console.error(err.message)
})
.finally (async () => {
    await prisma.$disconnect()
}) 
