 function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
 /* const arr = []
  for (let i of state.days) {
    if (i.name === day) {
      for (let j of i.appointments) {
        arr.push(state.appointments[j])
      }
    }
  }
  return arr;*/
  const foundDay = state.days.find(d => d.name === day)
  if (!foundDay) {
    return [];
  }
  return foundDay.appointments.map(appointmentId => state.appointments[appointmentId])
}

 function getInterview(state, interview) {
  const val1 = state.interviewers;
  let obj = {student: "name",
             interviewer: {id: 0,
                           name: "name",
                          avatar: "avatar"}}
  //for (let i in state.interviewers) {
   // if (i === interview.interviewer) { 
    if (interview){
      const val2 = interview.interviewer 
      const val3 = val1[val2]
      obj.student = interview.student
      obj.interviewer.id = interview.interviewer
      obj.interviewer.name =  val3.name 
      obj.interviewer.avatar = val3.avatar
    } else {
      obj = null;
    }
 // }
  return obj;
}

function getInterviewersForDay(state, day ) {
  const foundDay = state.days.find(d => d.name === day)
  if (!foundDay) {
    return [];
  }
  return foundDay.interviewers.map(interviewerId => state.interviewers[interviewerId])

}
module.exports = { getAppointmentsForDay , getInterview , getInterviewersForDay}