/*
 * Modified from https://www.previousnext.com.au/blog/powerful-react-redux-toolkit-pattern-reuseable-state-slices
 *
 *
 * == How to use this
 *
 * === Slice
 *
 * createMySlice = ({name}) => {
 *  const myThunkAction = createAsyncThunk(
 *    `${name}/myThunkAction`,
 *    async (actionParams, thunkAPI) => {
 *
        const { someId } = getState()[name]
 *      ...
 *      return response.data
 *    }
 *  )
 *
 *  const slice = createSlice({name: name, ...})
 *
 *  // For convenience we just merge the thunk action into the slice's actions
 *  slice.actions = _.merge({}, slice.actions, {myThunkAction})
 *
 *  return slice
 * }
 *
 * === SliceProvider
 *
 * const WrappedApp = () => {
 *  return <SliceProvider slice={createMySlice({name: name})}>
 *    <App/>
 *  </SliceProvider>
 * }
 *
 * === Within App, instead of using `useSelector`, make use of
 * const {myAction, myThunkAction} = useSliceActions()
 *
 * // (a) fetch all of the state
 * const state = useSliceSelector()
 *
 * // (b) pass a selector function, which receives the state as input in the same way
 * //     that useSelector() would.
 * const transformedState = useSliceSelector(getTransformedState)
 *
 * == Notes
 * - Selector state is returned "bare", in other words there's no need to use the top-level key
 *   that you defined as part of the "createMySlice" function.
 *
 */
import React, { createContext, useContext } from "react"

import { useSelector } from "react-redux"

import _ from "lodash"

const SliceContext = createContext({})

const SliceProvider = ({ slice, children }) => (
  <SliceContext.Provider value={slice}>{children}</SliceContext.Provider>
)

const useSlice = () => {
  const slice = useContext(SliceContext)

  if (_.isEmpty(slice)) {
    throw new Error(
      "Cannot retrieve slice. Either <SliceProvider slice={...}> is not set, or the provider is not accessible within this context."
    )
  }

  return slice
}

const useSliceActions = () => useSlice().actions

const useSliceSelector = (selector = undefined) => {
  const { name } = useSlice()

  return useSelector((state) => {
    if (selector) {
      return selector(state[name])
    }
    return state[name]
  })
}

export { useSliceActions, useSliceSelector }

export default SliceProvider
