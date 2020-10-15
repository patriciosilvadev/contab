import React from 'react'
import { Bar } from 'react-chartjs-2'
import { PseudoBoxProps } from '@chakra-ui/core'
import CardInfo from '../../components/cardInfo'
import theme from '../../styles/theme'

const data = {
  labels: [
    'Out',
    'Nov',
    'Dez',
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set'
  ],
  datasets: [
    {
      order: 2,
      label: 'Recebimentos',
      data: [
        0,
        10000,
        20000,
        35000,
        30000,
        40000,
        23000,
        50000,
        30000,
        22000,
        30000,
        40000
      ],
      borderWidth: 1,
      backgroundColor: theme.colors.green[300],
      borderColor: theme.colors.green[300]
    }
  ]
}

const SalesChart: React.FC<PseudoBoxProps> = props => {
  return (
    <CardInfo title="Gráfico de vendas" {...props}>
      <Bar
        data={data}
        width={400}
        height={200}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value) {
                    return value > 999 ? value / 1000 + 'k' : value
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || ''

                if (label) {
                  label += ': '
                }
                label += tooltipItem.yLabel.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'BRL'
                })
                return label
              }
            }
          }
        }}
      />
    </CardInfo>
  )
}

export default SalesChart
