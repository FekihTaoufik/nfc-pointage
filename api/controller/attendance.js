const { notFound,badRequest, unauthorized, } = require('@hapi/boom');
const { validator, wrapAsync: wa } = require('express-server-app')
const moment = require('moment')
moment.locale('fr')

const db = require('../db/models')
const { Op } = require('sequelize');

const getAttendances = (req, res, next) => {
    const {sessionId} = req.params
    db.attendance.findAll({
        // include: {
        //     model: db.user,
        //     as: 'user'
        // },
        where: {sessionId}
    })
        .then((atts) => {
            res.json(atts);
        })
        .catch(next)
}

const postAttendenceStart = wa(async (req, res, next) => {
    // VERIFIER AUSSI LE GROUP
    const {
       userId,
       roomId,
    } = req.body;
    // const date = "2020-11-04T08:30:00.000Z";
    // const dateParsed = Date.parse(date)
    // const reelDate = new Date(dateParsed)
    const reelDate = moment()
    const session = await db.session.findOne({
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
    if (session === null) {
        throw notFound('aucune session n\'est programmée en ce moment pour cette salle');
    }
    let registeredAttendance = await db.attendance.findOne({
        where : {
             userId: userId,
            sessionId: session.id,
        }
    })
    if(!!registeredAttendance)
        throw badRequest('Vous avez déjà pointé votre présence pour cette séance')

    await db.attendance.create({
        userId: userId,
        sessionId: session.id,
        startedAt: reelDate,
    })
    const user = await db.user.findOne({
        where: {
            id: userId,
        }
    });
    res.json(user)
});

module.exports = {
    getAttendances,
    postAttendenceStart,
}
