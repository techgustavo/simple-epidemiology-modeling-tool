'use client'

import { useEffect } from 'react'
import { Chart, registerables, TooltipItem, ChartConfiguration } from 'chart.js'
import { sirdModel, sirdParams } from '@/utils/sirdModel'

Chart.register(...registerables)

const getChartConfig = (
  labels: number[],
  s: number[],
  i: number[],
  r: number[],
  d: number[],
  p: number[],
  foregroundColor: string,
  gridColor: string,
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

export const SirdChart = (params: sirdParams) => {
  const { beta, gamma, mu, population, infected, recovered, days } = params
  const { s, i, r, d, p } = sirdModel({
    beta,
    gamma,
    mu,
    population,
    infected,
    recovered,
    days,
  })

  const labels = Array.from({ length: s.length }, (_, index) => index) // Days 0 to N

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
          getChartConfig(labels, s, i, r, d, p, foregroundColor, gridColor),
        )

        return () => {
          chart.destroy()
        }
      }
    }
  }, [s, i, r, d, p, labels])

  return <canvas id="sirdChart" className="h-full w-full"></canvas>
}
