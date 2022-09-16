import React from "react"
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types'

function InterviewerList(props) {

  const Interviews = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)} />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {Interviews}
      </ul>
    </section>
  )
  // eslint-disable-next-line no-unreachable
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  }
}
export default InterviewerList