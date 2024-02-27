import React, { useState } from "react"

const CollapsableSection = ({ header, children }) => {
  const [isExpanded, setIsExpand] = useState(false)
  if (isExpanded) {
    return (
      <>
        <div
          key="fa-angle-up"
          className="d-inline cursor-pointer"
          onClick={() => setIsExpand(false)}
        >
          <i className="fas fa-angle-up fa-lg" />
        </div>
        {header}
        {children}
      </>
    )
  }
  return (
    <>
      <div
        key="fa-angle-down"
        className="d-inline cursor-pointer"
        onClick={() => setIsExpand(true)}
      >
        <i className="fas fa-angle-down fa-lg" />
      </div>
      {header}
    </>
  )
}

export default CollapsableSection
