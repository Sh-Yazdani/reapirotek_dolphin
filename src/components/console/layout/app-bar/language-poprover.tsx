import {
  Avatar,
  Badge,
  badgeClasses,
  Box,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import {Global} from 'iconsax-react'
import {upperCase} from 'lodash-es'
import React, {Fragment} from 'react'
import {useTranslation} from 'react-i18next'

import {IconContainer} from '@/components'
import {useMenu} from '@/hooks'
import type {Language} from '@/lib/i18next/i18next-config'
import {supportedLanguages} from '@/lib/i18next/i18next-config'

interface LanguagePopoverProps {
  iconSize: number
}

export const LanguagePopover: React.FC<LanguagePopoverProps> = ({iconSize}) => {
  const {i18n} = useTranslation()

  const {anchorEl, handleClick, handleClose, open} = useMenu()

  const handleSetLanguage = (nextLanguage: Language) => () => {
    void i18n.changeLanguage(nextLanguage)
    handleClose()
  }

  return (
    <Fragment>
      <Box onClick={handleClick}>
        <Badge
          badgeContent={upperCase(i18n.language)}
          className='cursor-pointer'
          color='secondary'
          sx={{
            [`& .${badgeClasses.badge}`]: {
              right: 0,
              top: 20,
              padding: '0 4px',
              color: 'common.white',
              borderRadius: 2.5,
              height: 19,
              width: 19,
              fontSize: {xs: 10, md: 10},
            },
          }}
        >
          <IconContainer
            aria-controls={open ? 'language-switch-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            className='cursor-pointer'
            color={open ? 'secondary.main' : 'neutrals.gray'}
            component={Global}
            size={iconSize}
          />
        </Badge>
      </Box>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 35,
          horizontal: 'right',
        }}
        MenuListProps={{
          sx: {width: 165, p: 0},
        }}
        open={open}
        sx={{width: 320}}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        onClose={handleClose}
      >
        {supportedLanguages.map((language, index) => {
          const isLastItem = index === supportedLanguages.length - 1
          /* TODO -> cleanup this */
          const isSelected = i18n.language === language.value
          return (
            <Box key={language.label}>
              <MenuItem
                sx={{height: 38}}
                onClick={handleSetLanguage(language.value)}
              >
                <Avatar
                  alt={language.label}
                  src={language.flag}
                  sx={{width: 24, height: 24, mr: 2}}
                />

                <Typography
                  fontWeight={isSelected ? 'medium' : 'regular'}
                  variant='caption'
                >
                  {language.label}
                </Typography>
              </MenuItem>
              {!isLastItem ? <Divider /> : null}
            </Box>
          )
        })}
      </Menu>
    </Fragment>
  )
}
