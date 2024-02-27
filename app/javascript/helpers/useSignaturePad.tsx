import React, { useRef } from "react"
import SignaturePad from "react-signature-pad-wrapper"

interface SignaturePadHelpers {
  setData(data: string): void
  getData(): string
  clear(): void
}

type UseSignaturePadType = [() => SignaturePad, SignaturePadHelpers]

const useSignaturePad = (): UseSignaturePadType => {
  const signaturePad: any = useRef({})

  const clearCanvas = () => signaturePad.current.clear()

  const getData = () => signaturePad.current.toDataURL()

  const setData = (dataUrl: string) => signaturePad.current.fromDataURL(dataUrl)

  return [() => <SignaturePad ref={signaturePad} />, { getData, setData, clear: clearCanvas }]
}

export default useSignaturePad
