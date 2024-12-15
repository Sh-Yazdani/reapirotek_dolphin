import * as React from 'react'
import {useGetSet, useUnmount} from 'react-use'
import type {Options} from 'recordrtc'
import RecordRTC, {MediaStreamRecorder} from 'recordrtc'

export const stopMediaStream = (mediaStream?: MediaStream) => {
  if (!mediaStream) {
    return
  }
  ;(mediaStream as MediaStream & {stop: () => void}).stop()

  if (mediaStream.getTracks()) {
    mediaStream.getTracks().forEach((stream) => stream.stop())
  }
}

export type PermissionStatus = 'denied' | 'granted' | 'prompt'
export type UserMediaState = 'pending' | 'rejected' | 'resolved'
const constraints: MediaStreamConstraints = {
  audio: true,
  video: {
    width: 1920,
    height: 1080,
    facingMode: {
      ideal: 'environment',
    },
  },
}

// eslint-disable-next-line fp/no-let
let stream: MediaStream | null = null

export const useVideoRecorder = () => {
  const [getPermission, setPermission] = useGetSet<
    PermissionStatus | undefined
  >('prompt')

  const [getError, setError] = useGetSet<Error | undefined>(undefined)
  const [getState, setState] = useGetSet<UserMediaState>('pending')

  const [getRecorderInstance, setRecorderInstance] = useGetSet<
    RecordRTC | undefined
  >(undefined)

  const updateMicrophonePermission = React.useCallback(
    (status: PermissionStatus) => {
      setPermission(status)
    },
    [],
  )
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const recorderOptions: Options = {
    type: 'video',
    recorderType: MediaStreamRecorder,
    mimeType: 'video/mp4',
    timeSlice: 1000, // pass this parameter
  }

  const requestMediaStream = React.useCallback(async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      updateMicrophonePermission('granted')
      setState('resolved')
      setError(undefined)

      return {permission: getPermission(), stream}
    } catch (_error) {
      console.log(_error)
      updateMicrophonePermission('denied')
      setState('rejected')
      setError(_error as Error)
    }
  }, [getPermission, setError, setState, updateMicrophonePermission])

  const cleanupMediaStream = () => {
    if (!stream) return
    stopMediaStream(stream)
    stream = null

    getRecorderInstance()?.reset()
    getRecorderInstance()?.destroy()
    setRecorderInstance(undefined)
  }

  const [getIsPermissionDeniedModalOpen, setIsPermissionDeniedModalOpen] =
    useGetSet<boolean>(false)

  const openPermissionDeniedModal = () => setIsPermissionDeniedModalOpen(true)

  const closePermissionDeniedModal = () => setIsPermissionDeniedModalOpen(false)

  const getRecorder = async () => {
    if (!stream) {
      await requestMediaStream()
    }

    if (getState() !== 'resolved' || !stream || getError()) {
      return openPermissionDeniedModal()
    }

    if (!getRecorderInstance()) {
      setRecorderInstance(new RecordRTC(stream, recorderOptions))

      return getRecorderInstance()
    }

    return getRecorderInstance()
  }

  useUnmount(() => {
    cleanupMediaStream()
  })

  return {
    getPermission,
    getIsPermissionDeniedModalOpen,
    getRecorder,
    openPermissionDeniedModal,
    closePermissionDeniedModal,
    cleanupMediaStream,
    getError,
    videoRef,
    stream,
  }
}
