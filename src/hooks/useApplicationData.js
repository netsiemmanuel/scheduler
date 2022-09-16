import { useState, useEffect } from "react"
import axios from "axios";
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });


  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayObj = state.days.find(d => d.name === state.day)
    let spots = dayObj.appointments.length;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id]
      if (appointment.interview) {
        spots--
      }
    }
    const day = { ...dayObj, spots };
    const days = state.days.map(d => d.name === state.day ? day : d)


    const savingURL = `/api/appointments/${id}`
    return axios.put(savingURL, { interview })
      .then((response) =>
        setState({
          ...state,
          appointments, days
        })

      )




  }
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let spots = 0
    const dayObj = state.days.find(d => d.name === state.day)
    for (const id of dayObj.appointments) {
      const appointment = appointments[id]
      if (!appointment.interview) {
        spots++
      }
    }
    const day = { ...dayObj, spots };
    const days = state.days.map(d => d.name === state.day ? day : d)

    const deleteURL = `/api/appointments/${id}`
    return axios.delete(deleteURL, { interview })
      .then((response) =>
        setState({
          ...state, appointments, days
        }))

  }

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])


  console.log("STATE", state)

  return { state, setDay, bookInterview, cancelInterview }
}