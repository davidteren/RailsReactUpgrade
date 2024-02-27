import _ from "lodash"

interface Field {
  value: any
}

export const appendValueElement = (field: Field, value: unknown): Field => ({
  ...field,
  value: _.concat(field.value, value),
})

export const removeValueElement = (field: Field, index: string): Field => ({
  ...field,
  value: _.filter(field.value, (_value, i) => i !== index),
})

export const updateValueElement = (field: Field, index: string, value: unknown): Field => ({
  ...field,
  value: [...field.value.slice(0, index), value, ...field.value.slice(index + 1)],
})
