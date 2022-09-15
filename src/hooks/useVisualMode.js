import { useState } from "react";
export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(newMode, replace = false) {
   // setHistory(prev => replace ? [ ...prev.slice(0,-1), newMode] : [ ...prev, newMode]) 
   const currentHistory = history
   if (replace) {
    currentHistory[currentHistory.length - 1] = newMode
    setHistory(currentHistory)
    return 
   }
   setHistory([...currentHistory, newMode])
  }




  function back() {
    if(history.length > 1) setHistory(prev => [ ...prev.slice(0,-1)]) 

  }

  return { mode: history[history.length-1], transition, back };
}