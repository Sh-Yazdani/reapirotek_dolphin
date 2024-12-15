import {
  Box,
  Button,
  Stack,
  styled,
  Typography as OriginalTypography,
  useEventCallback,
} from '@mui/material'
import getBlobDuration from 'get-blob-duration'
import {Camera, Pause, Record, Stop, VideoSquare} from 'iconsax-react'
import {nanoid} from 'nanoid'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useUpdate} from 'react-use'

import {PermissionDeniedModal} from './permission-denied-modal'
import {useVideoRecorder} from './useVideoRecorder'

export const AUDIO_RECORDER_INPUT_MINIMUM_RECORDING_TIME_SECONDS = 0

function getFileName(fileExtension: string) {
  const _date = new Date()
  const year = _date.getFullYear()
  const month = _date.getMonth()
  const date = _date.getDate()

  return `Recorder-${year}${month}${date}-${nanoid()}.${fileExtension}`
}

const VideoRecordButtonWrapper = styled(Stack)(({theme}) => ({
  height: 40,
  width: 40,
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius * 10,
  alignItems: 'center',
  flexShrink: 0,
  opacity: 0.8,
}))

const IconContainer = styled(Box)(({theme}) => ({
  color: '#FFFFFF',
  borderRadius: theme.shape.borderRadius * 10,
  height: '100%',
  width: '100%',
  margin: theme.spacing(1.5),
}))

const Typography = styled(OriginalTypography)({
  textShadow: '0px 0px 4px #000000',
})

type RecordingState = 'idle' | 'paused' | 'preview' | 'recording' | 'stopped'

// eslint-disable-next-line max-lines-per-function
export const VideoRecorder = () => {
  const {t} = useTranslation('operator')
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')

  const update = useUpdate()
  const {
    cleanupMediaStream,
    closePermissionDeniedModal,
    getError,
    getIsPermissionDeniedModalOpen,
    getPermission,
    getRecorder,
    stream,
    videoRef,
  } = useVideoRecorder()
  const [video, setVideo] = useState<Blob | undefined>(undefined)

  const onStart = useEventCallback(async () => {
    /* Cleaning up recorder for new recordings */
    const recorder = await getRecorder()

    if (getPermission() !== 'granted') return

    recorder?.reset()
    recorder?.startRecording()
    setRecordingState('recording')
  })

  const onPreview = async () => {
    const recorder = await getRecorder()
    if (getPermission() !== 'granted') return
    setRecordingState('preview')
    recorder?.startRecording()
  }

  const onStop = async () => {
    const recorder = await getRecorder()
    // stopTimer()
    setRecordingState('idle')

    if (!recorder) return

    const _onStop = async () => {
      const blob = recorder.getBlob()
      cleanupMediaStream()

      if (!blob) return

      const file = new File([blob], getFileName('mp4'), {
        type: 'video/mp4',
      })

      if (videoRef.current) {
        /* @ts-ignore cmm */
        videoRef.current.src = null
        videoRef.current.srcObject = null
      }

      try {
        const duration = await getBlobDuration(file)

        const hasMinimumLengthSpeech =
          duration > AUDIO_RECORDER_INPUT_MINIMUM_RECORDING_TIME_SECONDS

        if (hasMinimumLengthSpeech && blob) {
          setVideo(blob)
        } else {
          recorder.clearRecordedData()
        }

        // stopTimer()
      } catch (error) {
        // stopTimer()
      }
    }

    recorder.stopRecording(_onStop)
  }

  const onPause = async () => {
    const recorder = await getRecorder()
    if (!recorder) return
    recorder.pauseRecording()
    setRecordingState('paused')
    update()
  }

  const onResume = async () => {
    const recorder = await getRecorder()
    if (!recorder) return
    recorder.resumeRecording()
    setRecordingState('recording')
    update()
  }

  const onCancelRecording = () => {
    setVideo(undefined)
    void onPreview()
  }

  if (video) {
    return (
      <Stack gap={2} height='100%'>
        <Stack direction='row' gap={2} justifyContent='flex-end'>
          <Button variant='contained' onClick={onCancelRecording}>
            {t('videos.recorder.cancel', {defaultValue: 'Cancel'})}
          </Button>
          <Button variant='contained' onClick={onCancelRecording}>
            {t('videos.recorder.upload', {defaultValue: 'Upload'})}
          </Button>
        </Stack>

        <Box
          bgcolor='black'
          component='video'
          src={URL.createObjectURL(video)}
          sx={{
            height: 'calc(100% - (42.25px + 16px))',
          }}
          width='100%'
          autoPlay
          controls
          playsInline
        />
      </Stack>
    )
  }

  return (
    <Box height='100%' position='relative'>
      <PermissionDeniedModal
        open={getIsPermissionDeniedModalOpen()}
        onClose={closePermissionDeniedModal}
      />
      <Box
        ref={videoRef}
        bgcolor='black'
        component='video'
        controls={false}
        height='100%'
        minHeight='100%'
        width='100%'
        autoPlay
        muted
        playsInline
      />

      <Box
        left='50%'
        position='absolute'
        sx={{transform: 'translate(-50%, -50%)'}}
        top='50%'
      >
        {recordingState === 'idle' && (
          <Stack
            alignItems='center'
            gap={1}
            sx={{cursor: 'pointer'}}
            onClick={onPreview}
          >
            <VideoRecordButtonWrapper bgcolor='primary.main'>
              <IconContainer component={Camera} />
            </VideoRecordButtonWrapper>
            <Typography color='white' textAlign='center'>
              {t('videos.recorder.turn-on-camera', {
                defaultValue: 'Press to turn on camera',
              })}
            </Typography>
          </Stack>
        )}

        {recordingState === 'preview' && (
          <Stack
            alignItems='center'
            gap={1}
            justifyContent='center'
            sx={{cursor: 'pointer'}}
            onClick={onStart}
          >
            <VideoRecordButtonWrapper bgcolor='error.main'>
              <IconContainer component={Record} />
            </VideoRecordButtonWrapper>
            <Typography color='white' textAlign='center'>
              {t('videos.recorder.start-recording', {
                defaultValue: 'Press to start recording',
              })}
            </Typography>
          </Stack>
        )}

        {recordingState === 'recording' ? (
          <Stack
            alignItems='center'
            direction='row'
            gap={2}
            justifyContent='center'
          >
            <VideoRecordButtonWrapper bgcolor='primary.main'>
              <IconContainer component={Pause} onClick={onPause}>
                onPause
              </IconContainer>
            </VideoRecordButtonWrapper>

            <VideoRecordButtonWrapper bgcolor='primary.main'>
              <IconContainer component={Stop} onClick={onStop} />
            </VideoRecordButtonWrapper>
          </Stack>
        ) : null}

        {recordingState === 'paused' ? (
          <Stack direction='row' gap={2}>
            <VideoRecordButtonWrapper bgcolor='primary.main'>
              <IconContainer component={VideoSquare} onClick={onResume} />
            </VideoRecordButtonWrapper>
            <VideoRecordButtonWrapper bgcolor='primary.main'>
              <IconContainer component={Stop} onClick={onStop} />
            </VideoRecordButtonWrapper>
          </Stack>
        ) : null}
      </Box>
    </Box>
  )
}
