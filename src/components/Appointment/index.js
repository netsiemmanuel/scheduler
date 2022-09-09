import React from "react";
import "components/Appointment/styles.scss"
import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
export default function Appointment (props) {
  return (<article className="appointment">
    <>
    <Header time={props.time}/>
    {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
    </>
  </article>)
}