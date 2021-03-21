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
            res.json(users);
        })
        .catch(next)
}

module.exports = {
    getUsers,
    userLogin,
}