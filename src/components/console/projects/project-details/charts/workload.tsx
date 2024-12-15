import type {ChartConfiguration} from 'chart.js'
import type {TFunction} from 'i18next'
import {Bar} from 'react-chartjs-2'
import {useTranslation} from 'react-i18next'

import {ChartWrapper} from '@/components/console/projects/project-details/charts/chat-wrapper'

const getData = (t: TFunction<'projects'>) => ({
  labels: ['Constru', 'Project', '', '', '', '', ''],
  datasets: [
    {
      label: t('charts.workload.datasets.completed', {
        defaultValue: 'Completed',
      }),
      data: [13.64609053, 15.4888546],
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'transparent',
    },
    {
      label: t('charts.workload.datasets.remaining', {
        defaultValue: 'Remaining',
      }),
      data: [16.3233882, 11.21141975],
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'transparent',
    },
    {
      label: t('charts.workload.datasets.overdue', {defaultValue: 'Overdue'}),
      data: [12.25171468, 10.80229767],
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'transparent',
    },
  ],
})

const getConfig = (t: TFunction<'projects'>) =>
  ({
    type: 'bar',
    data: getData(t),
    options: {
      scales: {
        y: {
          stacked: true,
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        x: {
          stacked: true,
          border: {
            display: false,
          },
        },
      },
      maintainAspectRatio: false,

      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
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
      },
    },
  }) as ChartConfiguration

export const WorkloadChart = () => {
  const {t} = useTranslation('projects')
  return (
    <ChartWrapper
      title={t('charts.workload.title', {defaultValue: 'Workload'})}
    >
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
