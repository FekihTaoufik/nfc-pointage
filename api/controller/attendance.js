const { notFound, unauthorized } = require('@hapi/boom');
const { validator, wrapAsync: wa } = require('express-server-app')

const db = require('../db/models')
const { Op } = require('sequelize');

const getAttendances = (req, res, next) => {

    db.attendance.findAll({
        include: {
            model: db.user,
            as: 'user'
        }
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
    const reelDate = new Date()
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
    console.log(session);
    if (session === null) {
        throw notFound('aucune session n\'est programmée en ce moment pour cette salle');
    }
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
    console.log(user);
    if (user.role === 'TEACHER'){
        const attendances = await db.attendance.findAll({
            include: {
                model: db.user,
                as: 'user'
            },
            sessionId: session.id,
        })
        res.json(attendances)
    }
    res.json('ok')
});

module.exports = {
    getAttendances,
    postAttendenceStart,
}