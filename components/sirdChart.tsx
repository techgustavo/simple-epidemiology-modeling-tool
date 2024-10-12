'use client'

import { useEffect, useState } from 'react'
import { sirdModel } from '@/utils/sirdModel'
import { Chart, registerables, TooltipItem, ChartConfiguration } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { useValues } from '@/contexts/values'

const getChartConfig = (
  labels: number[],
  s: number[],
  i: number[],
  r: number[],
  d: number[],
  p: number[],
  foregroundColor: string,
  gridColor: string,
  onComplete: () => void,
): ChartConfiguration<'line'> => ({
  type: 'line',
  data: {
    labels, // X-axis labels (days)
    datasets: [
      {
        label: 'Susceptible',
        data: s,
        borderColor: 'blue',
      },
      {
        label: 'Infected',
        data: i,
        borderColor: 'orange',
      },
      {
        label: 'Recovered',
        data: r,
        borderColor: 'green',
      },
      {
        label: 'Deceased',
        data: d,
        borderColor: 'red',
      },
      {
        label: 'Population',
        data: p,
        borderColor: foregroundColor,
        hidden: true,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      onComplete,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
          color: foregroundColor,
        },
        ticks: {
          color: foregroundColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Population',
          color: foregroundColor,
        },
        ticks: {
          color: foregroundColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
    plugins: {
      /* zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      }, */
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'rect',
          color: foregroundColor,
          boxWidth: 10,
          generateLabels: (chart: Chart) => {
            const original = Chart.defaults.plugins.legend.labels.generateLabels
            const labelsOriginal = original.call(
              Chart.defaults.plugins.legend.labels,
              chart,
            )
            labelsOriginal.forEach((label) => {
              label.fillStyle = label.strokeStyle
            })
            return labelsOriginal
          },
        },
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems: TooltipItem<'line'>[]) {
            const dayIndex = tooltipItems[0].dataIndex
            return `Day ${dayIndex}`
          },
          labelColor: function (tooltipItem: TooltipItem<'line'>) {
            return {
              borderColor: tooltipItem.dataset.borderColor as string,
              backgroundColor: tooltipItem.dataset.borderColor as string,
            }
          },
        },
      },
    },
  },
})

Chart.register(...registerables, zoomPlugin)

export const SirdChart = () => {
  const { value } = useValues()

  const { s, i, r, d, p } = sirdModel(value)

  const labels = Array.from({ length: s.length }, (_, index) => index) // Days 0 to N

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const canvas = document.getElementById('sirdChart') as HTMLCanvasElement

    if (canvas) {
      const ctx = canvas.getContext('2d')

      if (ctx) {
        const foregroundColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--foreground')
          .trim()

        const gridColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--gridColor')
          .trim()

        const chart = new Chart(
          ctx,
          getChartConfig(
            labels,
            s,
            i,
            r,
            d,
            p,
            foregroundColor,
            gridColor,
            () => {
              setIsLoading(false)
            },
          ),
        )

        return () => {
          chart.destroy()
        }
      }
    }
  }, [value, s, i, r, d, p, labels])

  return (
    <div className="mb-16 h-full w-full">
      {isLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center align-middle">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-transparent ease-in" />
          <canvas id="sirdChart" style={{ display: 'none' }} />
        </div>
      ) : (
        <canvas id="sirdChart" />
      )}
    </div>
  )
}
