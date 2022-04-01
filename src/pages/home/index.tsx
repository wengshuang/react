import React, { useEffect } from 'react'
import { Chart } from '@antv/g2'

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
]
export default function Home(props: any) {
  useEffect(() => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 400,
    })
    // chart.tooltip({
    //   showMarkers: false,
    // })

    chart.interval().position('year*value')

    chart.interaction('element-active')

    chart.data(data)

    chart.render()
  }, [])
  return <div id="container"></div>
}
