import type {Theme} from '@mui/material'
import {merge} from 'lodash-es'

import alert from './alert'
import autocomplete from './auto-complete'
import button from './button'
import buttonBase from './button-base'
import card from './card'
import checkbox from './checkbox'
import dataGrid from './data-grid'
import dateCalendar from './date-calendar'
import dialog from './dialog'
import divider from './divider'
import formControlLabel from './form-control-label'
import formHelperText from './form-helper-text'
import linearProgress from './linear-progress'
import menuItem from './menu-item'
import outlinedInput from './outlined-input'
import paper from './paper'
import select from './select'
import iosSwitch from './switch'
import tabs, {Tab as tab} from './tabs'
import textField from './text-field'
import toggleButtonGroup from './toggle-button-group'

export default function componentsOverride(theme: Theme) {
  return merge(
    alert(theme),
    button(theme),
    checkbox(theme),
    textField(theme),
    outlinedInput(theme),
    formHelperText(theme),
    dateCalendar(theme),
    buttonBase(theme),
    card(theme),
    linearProgress(theme),
    tabs(theme),
    tab(theme),
    paper(theme),
    menuItem(theme),
    divider(theme),
    formControlLabel(theme),
    dataGrid(theme),
    dialog(theme),
    select(theme),
    autocomplete(theme),
    toggleButtonGroup(theme),
    iosSwitch(theme),
  )
}
