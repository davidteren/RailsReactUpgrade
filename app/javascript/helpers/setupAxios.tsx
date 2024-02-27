import axios from "axios"
import { Service } from "axios-middleware"
import qs from "qs"

import getCSRFToken from "@/helpers/csrfToken"

const service = new Service(axios)

// Nested object serialization on GET requests is broken in axios
// see https://github.com/axios/axios/issues/738#issuecomment-412905574
axios.interceptors.request.use((config) => {
  config.paramsSerializer = (params) =>
    qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false,
    })

  return config
})

const setup = () => {
  if (typeof window !== "undefined") {
    service.register({
      onRequest(config) {
        config.headers["X-CSRF-Token"] = getCSRFToken()
        return config
      },
    })
  }
}

export default setup
