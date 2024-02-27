import React from "react"
import _ from "lodash"

/**
 * Small utility package for converting an object-graph to a flat
 * representation that can easily be used for generating forms.
 */

/**
 * Transforms the given key based on the specified options
 *
 * @param key
 * @param options see formFlatten
 */
const prepareKey = (key, options = {}) => {
  if (options.snakeCase) {
    const re = /[A-Z]+/g

    const matches = []
    let m

    while ((m = re.exec(key)) !== null) {
      matches.push({
        text: m[0],
        start: m.index,
        end: m.index + m[0].length,
      })
    }

    let parts = [key]

    _.each(matches.reverse(), (m) => {
      parts = _.flatten([
        parts[0].substring(0, m.start),
        [`_${m.text.toLowerCase()}`, parts[0].substring(m.end, parts[0].length)],
        _.rest(parts, 1),
      ])
    })

    return parts.join("")
  }

  return key
}

const combineKey = (prefix = "", key = "") => {
  const prefixEmpty = !prefix || prefix.length === 0
  const keyEmpty = !key || key.length === 0

  if (prefixEmpty && keyEmpty) {
    throw new Error("Both prefix and key cannot be empty")
  }

  if (prefixEmpty) return key
  if (keyEmpty) return `${prefix}[]`

  return `${prefix}[${key}]`
}

/**
 * Take an object and flattens it onto a form-key styled array. Can't use objects here as
 * key-ordering is not guaranteed.
 *
 * @param obj
 * @param prefix
 * @param memo holds options and is modified during the calculation
 *  - snakeCase: should the given key be converted to snake_case
 *  - indexedArrays: uses numeric indexes for arrays
 *
 * Example
 * formFlatten('booking', { wetsuitSizes:[1,2,3], pax: { adults: 1, children: 2 } })
 * => [
 *      {key: 'booking[wetsuitSizes][]', value: 1}
 *      {key: 'booking[wetsuitSizes][]', value: 2}
 *      {key: 'booking[wetsuitSizes][]', value: 3}
 *      {key: 'booking[pax][adults]', value: 1}
 *      {key: 'booking[pax][children]', value: 2}
 *    ]
 */
const flatten = (prefix, obj, memo = {}) => {
  const rootLevel = memo.form === undefined

  memo = _.defaults(memo, {
    form: [],
    snakeCase: false,
    indexedArrays: false,
    ignoreNulls: false,
  })

  if (memo.ignoreNulls && obj === null) {
    return memo.form
  }

  if (!(_.isObject(obj) || _.isArray(obj)) || obj instanceof File) {
    if (!rootLevel) {
      memo.form.push({ key: prefix, value: obj })
    }

    return memo.form
  }

  if (_.isArray(obj) && !rootLevel) {
    _.each(obj, (value, key) => {
      if (memo.indexedArrays) {
        flatten(combineKey(prefix, key.toString()), value, memo)
      } else {
        flatten(combineKey(prefix), value, memo)
      }
    })
  } else {
    _.each(obj, (value, key) => flatten(combineKey(prefix, prepareKey(key, memo)), value, memo))
  }

  return memo.form
}

export const objectToFormData = (object: unknown, prefix = ""): FormData => {
  const formData = new FormData()

  flatten(prefix, object).forEach(({ key, value }) => {
    formData.append(key, value)
  })

  return formData
}

/**
 * Generates an array of hidden inputs using React.
 *
 * == Example
 *  objectToForm([{ key: 'a', value: 1}, { key: 'b', value: 2 }])
 *  <input type="hidden" name="a" value="1">
 *  <input type="hidden" name="b" value="2">
 */
const objectToForm = (object, prefix = "") =>
  flatten(prefix, object).map(({ key, value }) => (
    <input key={key} type="hidden" name={key} value={value} />
  ))

export default objectToForm
