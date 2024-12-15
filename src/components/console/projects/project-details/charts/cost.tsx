import type {ChartConfiguration} from 'chart.js'
import type {TFunction} from 'i18next'
import {Bar} from 'react-chartjs-2'
import {useTranslation} from 'react-i18next'

import {ChartWrapper} from '@/components/console/projects/project-details/charts/chat-wrapper'

const getData = (t: TFunction<'projects'>) => ({
  labels: ['Constru', 'Project', '', '', ''],
  datasets: [
    {
      label: t('charts.cost.datasets.actual', {defaultValue: 'Actual'}),
      data: [13.12791495, 10.73199588],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: t('charts.cost.datasets.planned', {defaultValue: 'Planned'}),
      data: [4.11796982, 2.42163923],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(54, 162, 235)',
    },
  ],
})
const getConfig = (t: TFunction<'projects'>): ChartConfiguration => ({
  type: 'bar',
  data: getData(t),
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        border: {
          display: false,
        },
        ticks: {
          stepSize: 5,
          // eslint-disable-next-line func-names
          callback: function (value, index, ticks) {
            return `${value}K` // add a dollar sign to the y-axis labels
          },
        },
      },
    },

    plugins: {
      datalabels: {
        display: false,
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

      // title: {
      //   display: false,
      //   text: 'Cost',
      //   align: 'start',
      //   font: {
      //     size: 20,
      //   },
      // },
    },
  },
})

export const CostChart = () => {
  const {t} = useTranslation('projects')
  return (
    <ChartWrapper title={t('charts.cost.title', {defaultValue: 'Cost'})}>
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
