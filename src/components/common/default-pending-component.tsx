import {CircularProgress, Stack} from '@mui/material'

export const DefaultPendingComponent = () => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      mt={5}
      mx='auto'
      width='100%'
    >
      <CircularProgress size={20} />
    </Stack>
  )
}
