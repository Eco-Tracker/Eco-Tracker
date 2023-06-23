const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (req, res) => {
    try {
        const userChallenge = await prisma.userChallenge.findMany(
            {
                where: {
                    idUser: req.params.idUser
                }
            }
        );
        res.status(200).json(userChallenge);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


const updateChallange = async (req, res) => {
    try {
        const challanges = await prisma.userChallenge.update({
            where: { id: req.params.id },
            data: {
                isCompleted: false,
            },
        });
        res.status(200).json(challanges);
    } catch (err) {
        res.status(500).json(err);
    }
};

const startChallange = async (req, res) => {
    try {
        const userChallenge = await prisma.userChallenge.create({
            data: {
                idUser: req.body.idUser,
                idChallenge: req.body.idChallenge,
                id:req.body.iduser
            }
        })

        res.status(201).json(userChallenge)
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ message: "An error occurred while starting the challenge." });
    }
};

module.exports = {
    getAll,
    updateChallange,
    startChallange
};