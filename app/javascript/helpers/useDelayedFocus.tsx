import { useState } from "react"

const useDelayedFocus = () => {
  const [mustFocus, setMustFocus] = useState(false)
  const ref = (input) => {
    if (mustFocus && input) {
      input.focus()
      setMustFocus(false)
    }
  }
  const setFocus = () => {
    setMustFocus(true)
  }

  return [ref, setFocus]
}

export default useDelayedFocus
