import React from 'react'
import { Bar } from 'react-chartjs-2'
import { PseudoBoxProps } from '@chakra-ui/core'
import CardInfo from '../../components/cardInfo'
import theme from '../../styles/theme'

const data = {
  labels: ['28. Set', '29. Set', '30. Set', '1. Out', '2. Out', '3. Out'],
  datasets: [
    {
      order: 2,
      label: 'Recebimentos',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      backgroundColor: theme.colors.green[300],
      borderColor: theme.colors.green[300]
    },
    {
      order: 2,
      label: 'Pagamentos',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
      backgroundColor: theme.colors.red[400],
      borderColor: theme.colors.red[400]
    },
    {
      order: 1,
      type: 'line',
      fill: false,
      label: 'Saldo',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 2,
      backgroundColor: theme.colors.gray[600],
      borderColor: theme.colors.gray[600]
    }
  ]
}

const CashFlow: React.FC<PseudoBoxProps> = props => {
  return (
    <CardInfo title="Fluxo de caixa diário" {...props}>
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

export default CashFlow
