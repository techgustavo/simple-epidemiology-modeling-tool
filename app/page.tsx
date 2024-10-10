'use client'
import { useEffect } from 'react'
import { sirModel } from '../utils/sirdModel'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function Home() {
  const { s, i, r, d, p } = sirModel({
    beta: 1,
    gamma: 0.3,
    mu: 0.1,
    population: 1000,
    infected: 1,
    recovered: 0,
    days: 30,
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

        const chart = new Chart(ctx, {
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
                  color: foregroundColor,
                  boxWidth: 10,
                  generateLabels: (chart) => {
                    const original =
                      Chart.defaults.plugins.legend.labels.generateLabels
                    const labelsOriginal = original.call(
                      Chart.defaults.plugins.legend.labels,
                      chart,
                    )
                    labelsOriginal.forEach((label) => {
                      label.fillStyle = label.strokeStyle
                      label.strokeStyle = label.strokeStyle || 'trasparent'
                      label.pointStyle = 'rect'
                    })
                    return labelsOriginal
                  },
                },
              },
              tooltip: {
                callbacks: {
                  title: function (tooltipItems) {
                    const dayIndex = tooltipItems[0].dataIndex
                    return `Day ${dayIndex}`
                  },
                  labelColor: function (tooltipItem) {
                    return {
                      borderColor: tooltipItem.dataset.borderColor as string,
                      backgroundColor: tooltipItem.dataset
                        .borderColor as string,
                    }
                  },
                },
              },
            },
          },
        })

        return () => {
          chart.destroy()
        }
      }
    }
  }, [d, i, r, s, p, labels])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center align-middle">
      <div className="h-auto w-full max-w-5xl">
        <canvas id="sirdChart" className="h-full w-full"></canvas>
      </div>
    </div>
  )
}
