import React, { createContext, useContext } from "react"

let FlipflopInternalContext = createContext({
  featureFlags: {},
  initialized: false,
})

let FEATURE_FLAGS = null

const initialize = (featureFlags) => {
  FEATURE_FLAGS = featureFlags
  // XXX Makes using of the FlipFlopContext redundant
  const context = {
    featureFlags: FEATURE_FLAGS,
    initialized: true,
  }
  FlipflopInternalContext = createContext(context)
}

const isFeatureOnStrict = (feature) => {
  const enabled = isFeatureOnStrict(feature)

  if (typeof enabled === "undefined") {
    throw new Error(`${feature} is not defined`)
  }

  return enabled
}

const isFeatureOn = (feature) => {
  const { featureFlags, initialized } = useContext(FlipflopInternalContext)

  if (!initialized) {
    throw new Error(
      "Flipflop not initialized. Ensure all calls to flipflop are wrapped in <FlipflopProvider>"
    )
  }

  return featureFlags[feature]
}

const isFeatureOff = (feature, ...extra) => !isFeatureOn(feature, ...extra)

const FlipflopProvider = (props) => {
  if (!FEATURE_FLAGS) {
    throw new Error("Flipflop not initialized. Did you forget to call initialize?")
  }

  const context = {
    featureFlags: FEATURE_FLAGS,
    initialized: true,
  }

  return (
    <FlipflopInternalContext.Provider value={context}>
      {props.children}
    </FlipflopInternalContext.Provider>
  )
}

const IfFeatureOn = ({ feature, children }) => {
  if (isFeatureOn(feature)) {
    return children
  }
  return <> </>
}

export { initialize, isFeatureOn, isFeatureOff, FlipflopProvider, IfFeatureOn }
