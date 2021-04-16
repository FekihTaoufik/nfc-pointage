const { notFound, unauthorized } = require('@hapi/boom');
const { Op } = require("sequelize");
const db = require('../db/models')

const getUsers = (req, res, next) => {

    db.user.findAll({
        include: {
            model: db.group,
            as: 'Group'
        }
    })
        .then((users) => {
            res.json(users);
        })
        .catch(next)
}

const getUsersDemo = (req, res, next) => {
    db.user.findAll({
        include: {
            model: db.group,
            as: 'Group'
        },
        where: {
            [Op.or]: {
                groupId: 1,
                role: 'TEACHER'
            }
        },
    })
        .then((users) => {
            res.json(users);
        })
        .catch(next)
}
const userLogin = (req, res, next) => {
    const { universityCardId, password } = req.body;
    console.log({
        universityCardId
    });
    db.user.findOne({
        include: {
            model: db.group,
            as: 'Group'
        },
        where: {
            universityCardId,
        }
    })
        .then((users) => {
            if (users === null) {
                throw notFound(`Le numéro ${universityCardId} n\'est associé à aucun utilisateur.`);
            }
            res.json(users);
        })
        .catch(next)
}

module.exports = {
    getUsersDemo,
    getUsers,
    userLogin,
}