
// This function will return an array of appointments for the given day.
function getAppointmentsForDay(state, day) {

  const foundDay = state.days.find(d => d.name === day)
  if (!foundDay) {
    return [];
  }
  return foundDay.appointments.map(appointmentId => state.appointments[appointmentId])
}

// This function will return an object that contains the interview data if it is passed an object that contains an interviewer.
function getInterview(state, interview) {
  const interviewersObj = state.interviewers;
  let obj = {}

  if (interview) {
    const interviewerId = interview.interviewer
    const interviewerObj = interviewersObj[interviewerId]
    obj.student = interview.student
    obj.interviewer = {}
    obj.interviewer.id = interview.interviewer
    obj.interviewer.name = interviewerObj.name
    obj.interviewer.avatar = interviewerObj.avatar

  } else {
    obj = null;
  }

  return obj;
}

// This function will return an array containing interviewer objects for the given day.
function getInterviewersForDay(state, day) {
  const foundDay = state.days.find(d => d.name === day)
  if (!foundDay) {
    return [];
  }
  return foundDay.interviewers.map(interviewerId => state.interviewers[interviewerId])

}
module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }