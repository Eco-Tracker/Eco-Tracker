const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (req, res) => {
    try {
        const challenges = await prisma.challenges.findMany();
        res.status(200).json(challenges);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getOne = async (req, res) => {
    try {
        const challenges = await prisma.challenges.findMany({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(challenges);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const addChallange = async (req, res) => {
    try {
        const challenge = await prisma.challenges.create({
            data: {
                deadline: req.body.deadline,
                name: req.body.name,
                description: req.body.description,
                points: req.body.points,
                isCompleted: false,
                author: {
                    connect: { id: req.body.authorId },
                },
            },
        });
        res.status(201).json(challenge);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ message: "An error occurred while creating the challenge." });
    }
};



const updateChallange = async (req, res) => {
    try {
        const challanges = await prisma.challenges.update({
            where: { id: req.params.id },
            data: {
                ...req.body,
            },
        });
        res.status(200).json(challanges);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAceptedUserChallenges = async (req, res) => {
    try {
        const userId = req.body.id;
        console.log(userId);
        const userChallenges = await prisma.challenges.findMany({
            where: { id: userId },
            // include: { challenge: true },
        });
        res.status(200).json(userChallenges);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ message: "An error occurred while retrieving the challenges." });
    }
};

const updateUserChallengeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isCompleted } = req.body;
        const userChallenge = await prisma.challenges.update({
            where: { id },
            data: { isCompleted },
        });
        res.status(200).json(userChallenge);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ message: "An error occurred while updating the challenge." });
    }
};

const deleteChallange = async (req, res) => {
    try {
        const challanges = await prisma.challenges.delete({
            where: { id: req.params.id },
        });
        res.status(200).json(challanges);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAll,
    getOne,
    deleteChallange,
    getAceptedUserChallenges,
    addChallange,
    updateChallange,
    updateUserChallengeStatus,
};