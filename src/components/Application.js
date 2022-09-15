import React from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

export default function Application(props) {

 const {state, setDay, bookInterview, cancelInterview} = useApplicationData()

 

  const interviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsArr = dailyAppointments.map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          bookInterview={bookInterview}
          interviewers={interviewers}
          cancelInterview={cancelInterview}
        />)
    }
  )


 
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList days={state.days} value={state.day} onChange={setDay} />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArr}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}