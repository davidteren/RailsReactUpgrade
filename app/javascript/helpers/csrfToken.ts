const getCSRFToken = (): string => {
  const tokenNode = document.querySelector('meta[name="csrf-token"]')

  if (tokenNode) {
    return tokenNode.content
  }

  return ""
}

export default getCSRFToken
