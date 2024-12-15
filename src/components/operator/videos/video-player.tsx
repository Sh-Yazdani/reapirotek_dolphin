import {Box} from '@mui/material'
import React from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  src: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({src}) => {
  return (
    <Box
      borderRadius={2}
      display='flex'
      justifyContent='center'
      overflow='hidden'
    >
      <ReactPlayer
        height='100%'
        url={src}
        width='100%'
        autoPlay
        controls
        loop
        muted
        playsinline
      />
    </Box>
  )
}
