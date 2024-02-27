import { Notyf, NotyfHorizontalPosition, NotyfVerticalPosition } from "notyf"
import "notyf/notyf.min.css"

const X_POSITION: NotyfHorizontalPosition = "right"
const Y_POSITION: NotyfVerticalPosition = "top"

const BUILD_NOTYF_DEFAULTS = {
  dismissible: true,
  position: { x: X_POSITION, y: Y_POSITION },
  // duration: 15000,
  // Infinite duration
  duration: 0,
}

const buildNotyf = (options = BUILD_NOTYF_DEFAULTS) =>
  new Notyf({
    ...options,
    types: [
      {
        type: "info",
        background: "#0948B3",
        icon: {
          className: "fas fa-info-circle",
          tagName: "span",
          color: "#fff",
        },
      },
      {
        type: "success",
        background: "#3dc763",
        icon: {
          className: "fas fa-check-circle",
          tagName: "span",
          color: "#fff",
        },
      },
      {
        type: "warning",
        background: "#F5B759",
        icon: {
          className: "fas fa-exclamation-triangle",
          tagName: "span",
          color: "#fff",
        },
      },
      {
        type: "error",
        background: "#FA5252",
        icon: {
          className: "fas fa-times",
          tagName: "span",
          color: "#fff",
        },
      },
    ],
  })

const notyf = buildNotyf()

const Notifications = {
  Types: ["info", "success", "warning", "error"],
}

// Populate Notifications.{success, info, ...} functions
Notifications.Types.forEach(
  (type) =>
    (Notifications[type] = (message: string, { ...options }) =>
      notyf.open({ message, type, ...options }))
)

export default Notifications
