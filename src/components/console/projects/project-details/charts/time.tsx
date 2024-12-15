import type {ChartConfiguration} from 'chart.js'
import type {TFunction} from 'i18next'
import {Bar} from 'react-chartjs-2'
import {useTranslation} from 'react-i18next'

import {ChartWrapper} from '@/components/console/projects/project-details/charts/chat-wrapper'

const getData = (t: TFunction<'projects'>) => ({
  labels: ['Constru', 'Project', '', '', '', '', ''],
  datasets: [
    {
      label: t('charts.time.datasets.ahead', {defaultValue: 'Ahead'}),
      data: [0, 0],
      borderColor: 'rgb(69, 101, 245)',
      borderWidth: 0,
      backgroundColor: 'rgb(69, 101, 245)',
    },
    {
      label: t('charts.time.datasets.on-time', {defaultValue: 'On Time'}),
      data: [10, 17],
      borderColor: 'rgb(50, 215, 166)',
      backgroundColor: 'rgb(50, 215, 166)',
      borderWidth: 0,
    },

    {
      label: t('charts.time.datasets.behind', {defaultValue: 'Behind'}),
      data: [0, 0],
      borderColor: 'rgb(240, 126, 19)',
      backgroundColor: 'rgb(240, 126, 19)',
      borderWidth: 0,
    },
  ],
})

const getConfig = (t: TFunction<'projects'>): ChartConfiguration => ({
  type: 'bar',
  data: getData(t),
  options: {
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },

    scales: {
      x: {
        border: {
          display: false,
        },
        min: -100,
        max: 100,
        ticks: {
          callback: (value, index, ticks) => {
            return Math.abs(value as number)
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          stepSize: 5,
        },
      },
    },

    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        /* @ts-ignore ignore */
        color: (context) => {
          return context.dataset.backgroundColor
        },
        formatter: (value, context) => {
          if (!value) return ''
          return `${value}%`
        },
      },
      tooltip: {
        callbacks: {
          label: (value) => {
            return `${value.formattedValue}% ${value.dataset.label}`
          },
        },
      },
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle', // or 'square', 'triangle', etc.
        },
        display: true,
        position: 'top',
        align: 'start',
      },
    },
  },
})

export const TimeChart = () => {
  const {t} = useTranslation('projects')
  return (
    <ChartWrapper title={t('charts.time.title', {defaultValue: 'Time'})}>
      <Bar
        {...(getConfig(t) as any)}
        plugins={[
          {
            id: 'increase-legend-spacing',
            beforeInit(chart) {
              // Get reference to the original fit function
              const originalFit = (chart.legend as any).fit

              // Override the fit function
              ;(chart.legend as any).fit = function fit() {
                // Call original function and bind scope in order to use `this` correctly inside it
                originalFit.bind(chart.legend)()
                /* @ts-ignore ignore this */
                // eslint-disable-next-line react/no-this-in-sfc
                this.height += 12
              }
            },
          },
        ]}
      />
    </ChartWrapper>
  )
}
