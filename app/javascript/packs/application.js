import "core-js/stable"
import "core-js/features/object/entries"
import "regenerator-runtime/runtime"
import "../components"

import Rails from "@rails/ujs"
import ReactRailsUJS from "react_ujs"
import * as ActiveStorage from "@rails/activestorage"
// import "channels"

// TODO Determine whether or not to move the following assets into their own pack
import "bootstrap-icons/font/bootstrap-icons.css"

import "@fortawesome/fontawesome-free/js/fontawesome"
import "@fortawesome/fontawesome-free/js/solid"
import "@fortawesome/fontawesome-free/js/regular"
import "@fortawesome/fontawesome-free/js/brands"



// Primereact
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

import setupAxios from "@/helpers/setupAxios"



require.context("@/images", true)


Rails.start()
ActiveStorage.start()
/* global gon */


ReactRailsUJS.useContext(require.context("@/", true, /components\//))
setupAxios()
