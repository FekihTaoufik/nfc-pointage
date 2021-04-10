const { notFound, badData, unauthorized } = require('@hapi/boom')
const { validator, wrapAsync: wa } = require('express-server-app')
const _ = require('lodash')
const moment = require('moment')
moment.locale('fr')
const db = require('../db/models')
const { Op } = require('sequelize')

const createDemoSession = async (req, res, next) => {
  const { roomId } = req.body

  const startDateTime = moment()
  const endDateTime = moment().add(3, 'hours')

  if (!roomId) return next(badData('Room id not correctly defined'))

  const foundRoom = await db.room.findOne({ where: { id: roomId } })

  if (!foundRoom) return next(badData('Room not found'))

  const createdSession = await db.session.upsert({
    name: `Demo session starting from ${startDateTime} until ${endDateTime}`,
    teacherId: _.random(1, 5),
    groupId: _.random(1, 4),
    roomId: roomId,
    startedAt: startDateTime,
    endedAt: endDateTime,
  })

  res.json(createdSession)
}
const getAttendanceForSession = async (req, res, next) => {
  const { sessionId } = req.params

  if (!sessionId) return next(badData('Session id not correctly defined'))

  const foundSession = await db.session.findOne({
    where: { id: sessionId },
    include: [
      {
        model: db.group,
        as: 'Group',
        include: {
          attributes:['id','firstName','lastName','role'],
          model: db.user,
          as: 'Users',

        },
      },
      {
        model: db.attendance,
        as: 'Attendances',
      },
    ],
  })

  if (!foundSession) return next(badData('Session not found'))
  let attendances = foundSession.dataValues.Attendances
  let attendants = foundSession.dataValues.Group.dataValues.Users

  attendants = attendants.map(a=>{
    a = a.dataValues
    a.present = false
    a.joined_at = null
    a.left_at = null


    let presence = attendances.find(o=>o.dataValues.userId === a.id)
    if(presence){
           a.present = true
    a.joined_at = presence.startedAt
    a.left_at = presence.endedAt
    }
    return a
  })
 res.json(attendants)
}
module.exports = {
  createDemoSession,
  getAttendanceForSession,
}
