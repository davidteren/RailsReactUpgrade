import _ from "lodash"
import { validate as uuidValidate, v4 as uuid } from "uuid"
import {
  isBefore as dateLt,
  isEqual as dateEq,
  isAfter as dateGt,
  addDays as dateAddDays,
} from "date-fns"

import { renderToString as reactRenderToString } from "react-dom/server"

const stringSafeTransform = (fn) => (s) => {
  if (!_.isString(s)) {
    return s
  }

  if (uuidValidate(s)) {
    return s
  }

  return fn(s)
}

const safeCamelCase = stringSafeTransform(_.camelCase)
const safeSnakeCase = stringSafeTransform(_.snakeCase)

const mapStringKeysToCamelCase = (obj) => _.mapKeys(obj, (_v, k) => safeCamelCase(k))

const mapStringKeysToSnakeCase = (obj) => _.mapKeys(obj, (_v, k) => safeSnakeCase(k))

const deepTransformKeys = (obj, transformer) => {
  const deepCloner = (obj) =>
    _.cloneDeepWith(obj, (o) => {
      if (_.isPlainObject(o)) {
        const withTransformedKeys = transformer(o)
        return _.cloneDeepWith(withTransformedKeys, (x) =>
          x === withTransformedKeys ? undefined : deepCloner(x)
        )
      }

      if (o instanceof File) {
        return o
      }
    })

  return deepCloner(obj)
}

const deepCamelizeKeys = (obj) => deepTransformKeys(obj, mapStringKeysToCamelCase)

const deepSnakeizeKeys = (obj) => deepTransformKeys(obj, mapStringKeysToSnakeCase)

const omitUnderscoreKeys = (obj) =>
  _.omitBy(obj, (value, key) => _.isString(key) && _.startsWith(key, "_"))

const requireKeys = (obj, ...keys) => {
  const missingKeys = keys.filter((k) => !_.has(obj, k))

  if (missingKeys.length > 0) {
    throw new Error(`The following keys are required: ${missingKeys.toString()}`)
  }
}

// is a <= b ?
const dateLteq = (a, b) => dateLt(a, b) || dateEq(a, b)

const dateGteq = (a, b) => dateGt(a, b) || dateEq(a, b)

const iterDays = (startDate, endDate, inclusive, fn) => {
  const hasMoreDays = (date) => (inclusive ? dateLteq : dateLt)(date, endDate)

  for (let d = startDate; hasMoreDays(d); d = dateAddDays(d, 1)) {
    if (fn(d) === false) break
  }
}

const iterDaysInclusive = (startDate, endDate, fn) => iterDays(startDate, endDate, true, fn)

const omitAt = (array, ...indices) => {
  const result = _.clone(array)

  _.each(_.reverse(_.sortBy(_.clone(indices))), (i) => result.splice(i, 1))

  return result
}

const isBlank = (v) => _.isNil(v) || _.isEmpty(v)

const isPresent = (v) => !isBlank(v)

// See https://stackoverflow.com/a/41855892/2490686
const renderToString = (reactComponent) => reactRenderToString(reactComponent)

const parseIntegerIgnoringNonDigits = (string) => Number(string.replace(/\D/g, ""))

const zeroAsDash = (value, defaultReturn = value) => {
  if (value === 0) {
    return "-"
  }
  return defaultReturn
}

// FIXME for Javascript date parsing which uses UTC when there is no TZ if date is formatted like ISO8601 (i.e. YYYY-MM-DD)
// However, dates formatted like YYYY/MM/DD are parsed as Local time.
// https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
const fixDateString = (value) => {
  if (_.isString(value)) {
    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return value.replaceAll("-", "/")
    }
    return value
  }
  return value
}

export {
  deepTransformKeys,
  deepCamelizeKeys,
  deepSnakeizeKeys,
  omitUnderscoreKeys,
  omitAt,
  requireKeys,
  iterDaysInclusive,
  dateLteq,
  dateGteq,
  dateGt,
  dateLt,
  dateEq,
  isBlank,
  isPresent,
  renderToString,
  parseIntegerIgnoringNonDigits,
  zeroAsDash,
  fixDateString,
  uuid,
}
