import React from "react";
import "components/Appointment/styles.scss"
import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const EDIT = "EDIT"
const CONFIRM = "CONFIRM"
const DELETING = "DELETING"
const ERROR_SAVE  = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true))
  }

  function destroy() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment" data-testid="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}


      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={back} 
          onSave={save} 
          student={props.interview.student} 
          interviewer={props.interview.interviewer.id} 
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not edit appointment."
          onClose={back}
          />
      )}

      {mode === CONFIRM && (
      <Confirm 
        message="Are you sure you would like to delete?" 
        onCancel={back} 
        onConfirm={destroy} 
      />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      
      {mode === ERROR_DELETE && (
        <Error 
        message="Could not delete appointment."
        onClose={back}
        />
      )}

    </article>
  )
}