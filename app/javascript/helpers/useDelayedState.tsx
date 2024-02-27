import { useState, useEffect } from "react"

export enum LoadState {
  Stale,
  Loading,
  Failed,
  Ready,
}

export const useDelayedState = ({ loadFn, context, initialValue }) => {
  const [loadState, setLoadState] = useState(LoadState.Stale)
  const [value, setValue] = useState(initialValue)

  const reload = () => {
    setLoadState(LoadState.Stale)
  }

  const control = {
    value,
    state: loadState,
    reload,
    setSuccess: (val) => {
      setValue(val)
      setLoadState(LoadState.Ready)
    },
    setFailed: () => {
      setLoadState(LoadState.Failed)
    },
  }

  useEffect(() => {
    if (control.state !== LoadState.Stale) return
    setLoadState(LoadState.Loading)
    loadFn(control, context)
  }, [control, loadFn, context])

  return control
}

export default useDelayedState
