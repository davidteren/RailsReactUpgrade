import _ from "lodash"

export const constantFor = (fields, path) => _.get(fields, `${path}.constant`, "")

export const isVisible = (fields, path) => _.get(fields, `${path}.visible`, true)

export const isHidden = (fields, path) => !isVisible(fields, path)

export const isEditable = (fields, path) => _.get(fields, `${path}.editable`, true)

export const formatFor = (fields, path) => _.get(fields, `${path}.format`, "")

export const labelFor = (fields, path) => _.get(fields, `${path}.label`, "")

export const actionExtras = (fields, path) => _.get(fields, `${path}.actionExtras`, {})
