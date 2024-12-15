import {Button, Card, Stack, TableHead, Typography} from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import {useTranslation} from 'react-i18next'

import {Table, TableCell, TableHeadCell, TableSubCell} from '@/components'
import {exportPDF} from '@/utils/pdf'

import {dailyLogsTableData} from './daily-logs-data'

// eslint-disable-next-line max-lines-per-function
const DailyLogsTableImpl = () => {
  const {t} = useTranslation('dailyLogs')
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeadCell>
            {t('table.headers.project', {defaultValue: 'Project'})}
          </TableHeadCell>
          <TableHeadCell>
            {t('table.headers.address', {defaultValue: 'Address'})}
          </TableHeadCell>
          <TableHeadCell>
            {t('table.headers.job-type', {defaultValue: 'Job Type'})}
          </TableHeadCell>
          <TableHeadCell>
            {t('table.headers.prepared-by', {defaultValue: 'Prepared By'})}
          </TableHeadCell>
          <TableHeadCell>
            {t('table.headers.date', {defaultValue: 'Date'})}
          </TableHeadCell>
        </TableHead>

        <TableRow>
          <TableCell>Garage</TableCell>
          <TableCell>123 Main St.</TableCell>
          <TableCell>Construction build</TableCell>
          <TableCell>Lus Godard</TableCell>
          <TableCell>12/3/2023</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.weather', {defaultValue: 'Weather'})}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableCell colSpan={5}>Sunny, clear, mid-70s</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.work', {defaultValue: 'Work'})}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableSubCell align='center' colSpan={4}>
            {t('table.headers.task', {defaultValue: 'Task'})}
          </TableSubCell>

          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.status', {defaultValue: 'Status'})}
          </TableSubCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={4}>Paint exterior</TableCell>
          <TableCell>Doing</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4}>Remove vegeration near foundation</TableCell>
          <TableCell>Done</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.crew', {defaultValue: 'Crew'})}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.id', {defaultValue: 'ID'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.type', {defaultValue: 'Type'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={2}>
            {t('table.headers.name', {defaultValue: 'Name'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.hours', {defaultValue: 'Hours'})}
          </TableSubCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>1</TableCell>
          <TableCell colSpan={1}>Painter</TableCell>
          <TableCell colSpan={2}>Joe Smith</TableCell>
          <TableCell colSpan={1}>5</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>2</TableCell>
          <TableCell colSpan={1}>Painter</TableCell>
          <TableCell colSpan={2}>Sam Jone</TableCell>
          <TableCell colSpan={1}>8</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>3</TableCell>
          <TableCell colSpan={1}>Landscaper</TableCell>
          <TableCell colSpan={2}>Jak Saley</TableCell>
          <TableCell colSpan={1}>7</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.equipment', {defaultValue: 'Equipment'})}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.id', {defaultValue: 'ID'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.type', {defaultValue: 'Type'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={2}>
            {t('table.headers.status', {defaultValue: 'Status'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.hours', {defaultValue: 'Hours'})}
          </TableSubCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>1</TableCell>
          <TableCell colSpan={2}>Paint blower</TableCell>
          <TableCell colSpan={1}>in use</TableCell>
          <TableCell colSpan={1}>5</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>2</TableCell>
          <TableCell colSpan={2}>Brushes, rollers</TableCell>
          <TableCell colSpan={1}>in use</TableCell>
          <TableCell colSpan={1}>9</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>3</TableCell>
          <TableCell colSpan={2}>Pick, shovers</TableCell>
          <TableCell colSpan={1}>in use</TableCell>
          <TableCell colSpan={1}>7</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.materials', {defaultValue: 'Materials'})}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.id', {defaultValue: 'ID'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.type', {defaultValue: 'Type'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={2}>
            {t('table.headers.used', {defaultValue: 'Used'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.remaining', {defaultValue: 'Remaining'})}
          </TableSubCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>1</TableCell>
          <TableCell colSpan={1}>paint</TableCell>
          <TableCell colSpan={1}>Yes</TableCell>
          <TableCell colSpan={2}>3 gallons</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>2</TableCell>
          <TableCell colSpan={1}>Trap</TableCell>
          <TableCell colSpan={1}>Yes</TableCell>
          <TableCell colSpan={2}>30 sq. ft.</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>3</TableCell>
          <TableCell colSpan={1}>Pick, shovers</TableCell>
          <TableCell colSpan={1}>in use</TableCell>
          <TableCell colSpan={2}>30 sq. ft.</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.delivered', {defaultValue: 'Delivered'})}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.id', {defaultValue: 'ID'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.type', {defaultValue: 'Type'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={2}>
            {t('table.headers.scheduled', {defaultValue: 'Scheduled'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.actual', {defaultValue: 'Actual'})}
          </TableSubCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>1</TableCell>
          <TableCell colSpan={2}>paint</TableCell>
          <TableCell colSpan={1}>8:00 AM</TableCell>
          <TableCell colSpan={1}>8:30 AM</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>2</TableCell>
          <TableCell colSpan={2}>Trap</TableCell>
          <TableCell colSpan={1}>Yes</TableCell>
          <TableCell colSpan={1}>30 sq. ft.</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>3</TableCell>
          <TableCell colSpan={2}>Pick, shovers</TableCell>
          <TableCell colSpan={1}>in use</TableCell>
          <TableCell colSpan={1}>30 sq. ft.</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.delays', {defaultValue: 'Delays'})}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.id', {defaultValue: 'ID'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.type', {defaultValue: 'Type'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={2}>
            {t('table.headers.description', {defaultValue: 'Description'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.time', {defaultValue: 'Time'})}
          </TableSubCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>1</TableCell>
          <TableCell colSpan={1}>Paint delivery</TableCell>
          <TableCell colSpan={2}>
            Paint come half an hour after expected
          </TableCell>
          <TableCell colSpan={1}>half-hours</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.issue', {defaultValue: 'Issue'})}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.id', {defaultValue: 'ID'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.type', {defaultValue: 'Type'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={2}>
            {t('table.headers.description', {defaultValue: 'Description'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.time', {defaultValue: 'Time'})}
          </TableSubCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>1</TableCell>
          <TableCell colSpan={1}>Paint delivery</TableCell>
          <TableCell colSpan={2}>Well done</TableCell>
          <TableCell colSpan={1}>half-hours</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.employee-accident', {
                defaultValue: 'Employee Accident',
              })}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.id', {defaultValue: 'ID'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.type', {defaultValue: 'Type'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={2}>
            {t('table.headers.description', {defaultValue: 'Description'})}
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            {t('table.headers.time', {defaultValue: 'Time'})}
          </TableSubCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>1</TableCell>
          <TableCell colSpan={1}>Paint delivery</TableCell>
          <TableCell colSpan={2}>Well done</TableCell>
          <TableCell colSpan={1}>12:18</TableCell>
        </TableRow>

        <TableHead>
          <TableRow>
            <TableHeadCell align='center' colSpan={5}>
              {t('table.headers.equipment-damage', {
                defaultValue: 'Equipment Damage',
              })}
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableSubCell align='center' colSpan={1}>
            ID
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            Type
          </TableSubCell>
          <TableSubCell align='center' colSpan={2}>
            Description
          </TableSubCell>
          <TableSubCell align='center' colSpan={1}>
            Time
          </TableSubCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={1}>1</TableCell>
          <TableCell colSpan={1}>Bolduzer</TableCell>
          <TableCell colSpan={2}>Well done</TableCell>
          <TableCell colSpan={1}>13:20</TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  )
}

export const DailyLogsTable = () => {
  const {t} = useTranslation('dailyLogs')
  return (
    <Stack gap={2}>
      <Stack
        alignItems='center'
        bgcolor='common.white'
        borderRadius={3}
        direction='row'
        justifyContent='space-between'
        px={{xs: 2, md: 3}}
        py={1}
      >
        <Typography fontWeight='bold' variant='t2'>
          {t('title', {defaultValue: 'Daily logs'})}
        </Typography>
        <Button
          size='medium'
          variant='contained'
          onClick={() => exportPDF([dailyLogsTableData], 'daily-logs')}
        >
          {t('export', {defaultValue: 'Export'})}
        </Button>
      </Stack>

      <Card>
        <DailyLogsTableImpl />
      </Card>
    </Stack>
  )
}
