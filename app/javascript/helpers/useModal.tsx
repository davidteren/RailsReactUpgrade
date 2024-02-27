import React, { useState, useContext, useEffect } from "react"

type ModalComponentType = ({ show }: { show: boolean; onHide: () => void }) => JSX.Element

const ModalContext = React.createContext(<></>)

const ModalHolder = (props) => {
  const [modal, setModal] = useState(null)

  return (
    <ModalContext.Provider value={setModal}>
      {modal && modal}
      {props.children}
    </ModalContext.Provider>
  )
}

const useModal = (renderModal) => {
  const [isVisible, setVisible] = useState(false)

  const setModal = useContext(ModalContext)

  const toggleModal = () => {
    if (isVisible) {
      setVisible(false)
      setModal(null)
    } else {
      setVisible(true)
    }
  }

  useEffect(() => {
    if (isVisible) setModal(renderModal({ show: true, onHide: toggleModal }))
    return () => {
      setModal(null)
    }
  }, [isVisible])

  return toggleModal
}

export { useModal, ModalHolder }
