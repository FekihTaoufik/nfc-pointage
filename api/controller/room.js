const db = require('../db/models')

const getRooms = (req, res, next) => {

    db.room.findAll({
    })
        .then((rooms) => {
            res.json(rooms);
        })
        .catch(next)
}

const roomLogin = (req, res, next) => {
    const { uuid, password } = req.body;
    console.log({
        uuid
    });
    db.room.findOne({
        include: {
            model: db.session,
            as: 'Sessions'
        },
        where: {
            uuid,
        }
    })
        .then((rooms) => {
            res.json(rooms);
        })
        .catch(next)
}

module.exports = {
    getRooms,
    roomLogin,
}