import React from "react"
import _ from "lodash"
import { v4 as uuid } from "uuid"

// Adapted form Makandra's https://makandracards.com/makandra/1395-simple_format-helper-for-javascript
export const simpleFormatJSX = (str: string): JSX.Element => {
  str = str.replace(/\r\n?/, "\n")
  str = _.trim(str)

  if (str.length == 0) {
    return null
  }

  const paragraphs = _.split(str, "\n\n")

  return _.map(paragraphs, (text) => {
    let segments = _.split(text, "\n")
    segments = _.reduce(
      segments,
      (arr, s) => _.concat(arr, <div key={uuid()}>{s}</div>, <br />),
      []
    )

    return <p key={uuid()}>{segments}</p>
  })
}
