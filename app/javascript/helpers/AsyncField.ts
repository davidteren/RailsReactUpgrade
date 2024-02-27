import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"
import _ from "lodash"

// An async field is one that must be loaded from a remote endpoint
import { LoadState } from "@/helpers/useDelayedState"

interface AsyncField<T> {
  value: T
  state: LoadState
  defaultValue: T
  message: string
}

/**
 * @param value the current value, if any
 * @param defaultValue the default value to use if currentValue is unspecified (default: undefined)
 * @param state the current state of the field (default: LoadState.Stale)
 */
function createField<T>({
  value = undefined,
  defaultValue = undefined,
  state = LoadState.Stale,
}: {
  value?: T
  defaultValue?: T
  state?: LoadState
}): AsyncField<T> {
  return {
    value: value || defaultValue,
    state,
    defaultValue,
    message: "",
  }
}

const createStaleField = () => createField({ state: LoadState.Stale })

const invalidateField = (field) => {
  field.state = LoadState.Stale
  field.value = field.defaultValue
  return field
}

/**
 * Retrieves the original action with payload when given a thunk-promise action.
 */
const originalAction = (thunkAction) => ({ payload: thunkAction.meta.arg, type: thunkAction.type })

interface LoadFunctionReturn {
  value: any
  message?: string
}

// TODO these aren't correct
type LoadFn = (...args: any[]) => Promise<LoadFunctionReturn>
type PathFn = (...args: any[]) => string

const cloneField = (field) => ({
  value: field.value,
  state: field.state,
  defaultValue: field.defaultValue,
  message: field.message,
})

const set = (obj, path, value) => {
  if (!_.has(obj, path)) return
  _.set(obj, path, value)
}

const setFieldLoading = (field, payload) => {
  set(field, "state", LoadState.Loading)
  set(field, "message", _.get(payload, "message", "Loading"))
  return field
}

const setFieldFailed = (field, payload) => {
  set(field, "state", LoadState.Failed)
  set(field, "message", _.get(payload, "message", "Could not reach server"))
  return field
}

const setFieldReady = (field, payload) => {
  set(field, "state", LoadState.Ready)
  set(field, "value", payload.value)
  set(field, "message", _.get(payload, "message", ""))
  return field
}

const createLoader =
  (loadFn) =>
  (field, ...args) => {
    setFieldLoading(field, {})
    return loadFn(...args)
      .then((payload) => setFieldReady(field, payload))
      .catch((payload) => setFieldFailed(field, payload))
  }

const loadingField = (field, payload) => setFieldLoading(cloneField(field), payload)
const failedField = (field, payload) => setFieldFailed(cloneField(field), payload)
const readyField = (field, payload) => setFieldReady(cloneField(field), payload)
const invalidatedField = (field) => invalidateField(cloneField(field))

interface AsyncThunkWithReducers extends AsyncThunk<LoadFunctionReturn, any, {}> {
  reducers: object
}

/**
 * Creates a load action with reducers for setting the value on the state.
 *
 * @param pathFn given the action returns the path to the field
 * @param thunkAction.payload.path specifies the path from the state root to this field
 * @param loadFn the function used to load the fields value
 *
 */
const createLoadThunk = (
  thunkName: string,
  pathFn: PathFn,
  loadFn: LoadFn
): AsyncThunkWithReducers => {
  const thunk = createAsyncThunk(thunkName, loadFn)

  const newReducer =
    (action, debug = false) =>
    (state, thunkAction) => {
      if (debug) console.error("thunkAction", thunkAction)

      const fieldPath = pathFn(originalAction(thunkAction))

      if (debug) console.log({ ...state })

      action(_.get(state, fieldPath), _.get(thunkAction, "payload"))

      return state
    }

  /**
   * It seems that we may have to use a builder pattern to avoid type errors, as explained here:
   *
   * https://redux-toolkit.js.org/usage/usage-with-typescript#building-type-safe-reducer-argument-objects
   *
   * For now I just muted the error for these specific instances.
   */
  return _.extend(thunk, {
    reducers: {
      // @ts-expect-error
      [thunk.pending]: newReducer(setFieldLoading),
      // @ts-expect-error
      [thunk.rejected]: newReducer(setFieldFailed, process.env.NODE_ENV === "development"),
      // @ts-expect-error
      [thunk.fulfilled]: newReducer(setFieldReady),
    },
  })
}

const getMessage = (field) => field.message

const getValue = (field) => field.value

const isLoading = (field) => field.state === LoadState.Loading

const isStale = (field) => field.state === LoadState.Stale

const isReady = (field) => field.state === LoadState.Ready

const isFailed = (field) => field.state === LoadState.Failed

const hasErrorMessage = (field) => isFailed(field) && getMessage(field)

// functional interface. Each of these functions return a copy instead of updating fields in-place
const fn = {
  loadingField,
  failedField,
  readyField,
  invalidatedField,
}

export {
  AsyncField,
  cloneField,
  createField,
  createStaleField,
  createLoadThunk,
  invalidateField,
  isStale,
  isFailed,
  isReady,
  isLoading,
  getMessage,
  hasErrorMessage,
  getValue,
  setFieldReady,
  setFieldLoading,
  setFieldFailed,
  LoadState,
  fn,
}
