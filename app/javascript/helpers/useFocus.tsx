import { useRef } from "react"

// https://stackoverflow.com/a/54159564
const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus()
  }
  return [htmlElRef, setFocus]
}

export default useFocus
