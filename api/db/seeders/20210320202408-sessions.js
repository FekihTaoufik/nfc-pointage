'use strict';
const _ = require('lodash')
const GOOGLE_CALENDAR_PLANNING_TIME_MIN = '2021-01-01T00:00:00.610Z'

const KEYWORDS_POSITIVE = ['exam','ue']
const KEYWORDS_NEGATIVE = ['soutenance','Réunion MBDS','Semaine de cours MBDS','RENDU RAPPORT','Pause déjeuner','PAUSE DEJEUNER', 'Cours MBDS à programmer']
const GOOGLE_CALENDAR_URL = 'https://www.googleapis.com/calendar/v3/calendars/qrohj3qr45o45a4enu1i686kro@group.calendar.google.com/events?key=AIzaSyBU2cBOzrFlAzAe_vhaS4iIF5MOXj-zvZY&timeMin='+GOOGLE_CALENDAR_PLANNING_TIME_MIN
const fetch = require('node-fetch');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('sessions', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const sanitize = (str)=>str.toLocaleLowerCase().replace(/[^\w\s]/gi, '')
    let data = await (await fetch(GOOGLE_CALENDAR_URL)).json()
    let scheduled_sessions = data.items
    
    let sessions = scheduled_sessions.reduce((cumul, curr,i) => {
      if (!curr.summary)
        return cumul
      const formattedSummary = sanitize(curr.summary)
      let condition =
        (!!curr.start && !!curr.end) && 
      (KEYWORDS_NEGATIVE.filter(kw=>formattedSummary.indexOf(sanitize(kw))>=0).length<=0 || KEYWORDS_POSITIVE.filter(kw=>formattedSummary.indexOf(sanitize(kw))>=0).length>0 ) 
      if(condition)
        cumul.push({
          id : i,
          name: curr.summary,
          teacherId: _.random(1,5),
          groupId: _.random(1,4),
          roomId: _.random(1,3),
          startedAt: curr.start?.dateTime,
          endedAt: curr.end?.dateTime,
          createdAt: new Date(),
          updatedAt: new Date()
        })
     return cumul
    }
    , [])
    console.log(sessions.length)
    await queryInterface.bulkInsert('sessions', sessions, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('sessions', null, {});
     */
    await queryInterface.bulkDelete('sessions', null, {});
  }
};
