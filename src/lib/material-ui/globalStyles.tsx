import {
  GlobalStyles as GlobalThemeStyles,
  tableContainerClasses,
  useTheme,
} from '@mui/material'

export const GlobalStyles = () => {
  const theme = useTheme()
  return (
    <GlobalThemeStyles
      styles={{
        body: {
          minWidth: 320,
          overflowX: 'hidden',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        '.cursor-pointer': {
          cursor: 'pointer',
          userSelect: 'none',
        },
        '.shrink-0': {
          flexShrink: 0,
        },
        '.hide-scrollbar': {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&:webkitScrollbar': {
            display: 'none',
          },
        },
        [theme.breakpoints.up('md')]: {
          [`*:not(.${tableContainerClasses.root}):not(.tasks-board)`]: {
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&:webkitScrollbar': {
              display: 'none',
            },
          },
        },
      }}
    />
  )
}
