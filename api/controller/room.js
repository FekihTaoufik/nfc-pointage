const db = require('../db/models')
const { Op } = require('sequelize');
const { validator, wrapAsync: wa } = require('express-server-app')


const getRooms = (req, res, next) => {

    db.room.findAll({
    })
        .then((rooms) => {
            res.json(rooms);
        })
        .catch(next)
}

const getCurrentSession = async(req, res, next) => {
    const {
        roomId,
     } = req.params;
    const reelDate = new Date()
    const session = await db.session.findOne({
        include:[{
            model: db.user,
            as: 'Teacher'
        },
        {
            model: db.room,
            as: 'Room'
        },
        {
            model: db.group,
            as: 'Group'
        },
    ],
        where: {
          startedAt: {
            [Op.lte]: reelDate
          },
          endedAt: {
            [Op.gte]: reelDate
          },
          roomId,
        }
    });
    res.json(session);
};

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
    getCurrentSession,
    roomLogin,
}