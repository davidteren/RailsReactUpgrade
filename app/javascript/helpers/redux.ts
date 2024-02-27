/**
 * Create a reducer that merges the payload into state
 *
 * @param {object} options
 * @param {object} [options.persistentState] State that persists for any update. Useful for something like `initialized: true`
 * @param {object} [options.key] The nested key that should be updated, as opposed to updating the whole state
 */
export const createPayloadReducer =
  (options = {}) =>
  (state, { payload }) => {
    const update = {
      ...payload,
      ...(options.persistentState || {}),
    }

    if (options.key) {
      return {
        ...state,
        [options.key]: {
          ...state[options.key],
          ...update,
        },
      }
    }
    return {
      ...state,
      ...update,
    }
  }
