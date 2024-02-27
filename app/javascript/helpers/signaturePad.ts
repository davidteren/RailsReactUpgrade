// High DPI screen handling
// See https://github.com/szimek/signature_pad#tips-and-tricks
export const resizeCanvas = ({ canvas }) => {
  const ratio = Math.max(window.devicePixelRatio || 1, 1)

  canvas.width = canvas.offsetWidth * ratio
  canvas.height = canvas.offsetHeight * ratio
  canvas.getContext("2d").scale(ratio, ratio)
}
