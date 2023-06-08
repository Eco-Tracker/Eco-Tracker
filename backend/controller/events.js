const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (req,res)=>{
    try{
    const events = await prisma.events.findMany();
    res.status(200).json(events)
}
catch(err){
    console.log(err)
     res.status(500).json(err)
}
}
const getOneByName = async (req,res)=>{
    try {
        const names= await prisma.events.findMany({ where: { name: req.params.name } })
         res.status(200).json(names)
    }
    catch (err) {
        
         res.status(500).json(err)
    }
}
const getOneBylocation = async (req, res) => {
    try {
        prisma.events.findMany({ where: { location: req.params.location } }).then((result) => {
        res.json(result);
      });
    } catch (err) {
      res.json(err);
    }
  };

const add = async (req , res)=>{
    try {
        const event = await prisma.events.create({
            data: {
                name: req.body.name,
                description : req.body.description ,
                participants : req.body.participants ,
                like: req.body.like,
                image: req.body.image,
                date : new Date(),
                location: req.body.location,
                author:{
                  connect:{id:req.body.id}
                }
            }
        })
         res.status(201).json(event)           
    }
    catch (err) {
        console.log(err)
         res.status(500).json(err)
    }

}
const update = async (req, res) => {
    try {
      const updatedEvent = await prisma.events.update({
        where: { idEV: req.params.idEV },
        data: {
          name: req.body.name,
          description: req.body.description,
          participants: req.body.participants,
          like: req.body.like,
          image: req.body.image,
          date: new Date(),
          location: req.body.location,
        },
      });
      res.status(200).json(updatedEvent);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
const deleteEvent = async (req, res) => {
    
    try {
        const profissional = await prisma.events.delete({
            where: { idEV : req.params.idEV }
        })
         res.status(200).json(profissional)
    }
    catch (err) {
         res.status(500).json(err)
    }
}

module.exports = {
    add,
    update,
    getOneByName,
    getOneBylocation,
    getAll, 
    deleteEvent
}