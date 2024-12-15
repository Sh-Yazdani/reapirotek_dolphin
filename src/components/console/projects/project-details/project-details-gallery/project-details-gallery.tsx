// Import Swiper React components
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'yet-another-react-lightbox/styles.css'
import './swiper.styles.css'

import {Box, Card, Stack, Typography} from '@mui/material'
import {Link} from '@tanstack/react-router'
import {Pause, Play} from 'iconsax-react'
import React, {useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useUpdate} from 'react-use'
import Scan from 'src/assets/icons/scan.svg?react'
import {Autoplay, FreeMode, Navigation, Thumbs} from 'swiper/modules'
import type {SwiperClass} from 'swiper/react'
import {Swiper, SwiperSlide} from 'swiper/react'
import Lightbox from 'yet-another-react-lightbox'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'

import {BackToLink, CardWithTitle} from '@/components'

const images = [
  '/assets/images/gallery/project/2024-08-06 10.29.36.jpg',
  '/assets/images/gallery/project/2024-08-06 10.30.32.jpg',
  '/assets/images/gallery/project/2024-08-06 10.30.40.jpg',
  '/assets/images/gallery/project/2024-08-06 10.30.45.jpg',
  '/assets/images/gallery/project/2024-08-06 10.30.48.jpg',
  '/assets/images/gallery/project/2024-08-06 10.30.53.jpg',
]

// eslint-disable-next-line max-lines-per-function
export const ProjectDetailsGallery = () => {
  const {t} = useTranslation(['projects', 'common'])
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)
  const update = useUpdate()

  const swiper = useRef<SwiperClass | null>(null)

  const handleSetAutoPlaying = () => {
    const isRunning = swiper.current?.autoplay.running

    if (isRunning) {
      swiper.current?.autoplay.stop()
    } else {
      swiper.current?.autoplay.start()
    }

    update()
  }

  const isPlaying = swiper.current?.autoplay.running

  const slides = images.map((image) => ({
    src: image,
  }))

  const [lightboxIndex, setLightboxIndex] = React.useState(-1)

  return (
    <CardWithTitle
      extra={
        <Link to='/console/projects'>
          <BackToLink
            caption={t('common:back', {defaultValue: 'Back'})}
            fontWeight='normal'
            underline={false}
          />
        </Link>
      }
      title={t('project-gallery.title', {
        defaultValue: 'Project gallery',
      })}
    >
      <Lightbox
        close={() => setLightboxIndex(-1)}
        index={2}
        open={lightboxIndex >= 0}
        plugins={[Fullscreen, Slideshow]}
        slides={slides}
      />
      <Box
        display='grid'
        gap={2}
        gridTemplateColumns={{xs: '1fr', xl: 'repeat(2, 1fr)'}}
      >
        <Card
          sx={{
            bgcolor: 'background.default',
            flexShrink: 0,
          }}
        >
          <Stack spacing={{xs: 3, md: 2, xl: 3}}>
            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '120px 1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-gallery.subject', {
                  defaultValue: 'Subject:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                Equipment damage
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '120px 1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-gallery.project-code', {
                  defaultValue: 'Project Code:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                7032
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '120px 1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-gallery.created-by', {
                  defaultValue: 'Created by:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                Philip Jons (5924)
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '120px 1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-gallery.zone', {defaultValue: 'Zone:'})}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                West virginia
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '120px 1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-gallery.date-time', {
                  defaultValue: 'Date Time:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                6/22/2024 14:23
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                {t('project-gallery.description', {
                  defaultValue: 'Description:',
                })}
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut
                enim ad minim veniam.
              </Typography>
            </Box>
          </Stack>
        </Card>

        <Box order={{xs: -1, xl: 0}} overflow='hidden'>
          <Swiper
            autoplay={false}
            className='main-swiper'
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            spaceBetween={10}
            thumbs={{swiper: thumbsSwiper}}
            onSwiper={(instance) => (swiper.current = instance)}
          >
            {images.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <img className='img-responsive' src={image} />

                  <Stack
                    bottom={(theme) => theme.spacing(2)}
                    color='primary.main'
                    direction='row'
                    gap={2}
                    position='absolute'
                    right={(theme) => theme.spacing(2)}
                  >
                    <Stack
                      alignItems='center'
                      bgcolor='common.white'
                      borderRadius={99}
                      className='cursor-pointer'
                      height={42}
                      justifyContent='center'
                      p={1}
                      style={{boxSizing: 'border-box'}}
                      width={42}
                      onClick={() => {
                        setLightboxIndex(index)
                      }}
                    >
                      <Scan />
                    </Stack>

                    <Stack
                      alignItems='center'
                      bgcolor='common.white'
                      borderRadius={99}
                      className='cursor-pointer'
                      component={isPlaying ? Pause : Play}
                      height={42}
                      p={1}
                      size={20}
                      style={{boxSizing: 'border-box'}}
                      width={42}
                      onClick={handleSetAutoPlaying}
                    />
                  </Stack>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Box>

        <Box
          gridColumn='1/-1'
          height={{xs: 90, md: 150}}
          order={{xs: -1, xl: 0}}
          overflow='hidden'
        >
          <Swiper
            className='mySwiper'
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            slidesPerView={5}
            spaceBetween={10}
            freeMode
            loop
            watchSlidesProgress
            onSwiper={(instance) => setThumbsSwiper(instance)}
          >
            {images.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={image} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Box>
      </Box>
    </CardWithTitle>
  )
}
