import { useState, useEffect } from "react"

// TODO(guest-app): Consider renaming this hook to useScreenSize in line with the
// official documentation: https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook
const ScreenSize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth)
  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  // TODO(guest-app): Consider returning both width and an isMobile boolean here, like
  // for example: { width, isMobile: width <= 1200 }
  return width <= 1200
}

export default ScreenSize
