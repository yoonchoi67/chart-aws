import React, { useState, useEffect } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../actions/posts';
import { useDataContext } from "./DataContext";

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'

// this component gets data from the dynamodb
const MainChartExample = attributes => {

  const dispatch = useDispatch();

  const { chartTicker } = useDataContext()

  //y-axes to use for charts
  const [yAxes, setYAxes] = useState([])

  //labels to be used for cchartline
  let labels = [];

  //data to use for charts
  const data = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getData(chartTicker));
  }, [chartTicker])

  const defaultDatasets = (() => {
    const pos_sentiments = []
    const total_comments = []

    data.forEach(arr => {
      pos_sentiments.push(arr.POS.N)
      total_comments.push(arr.total_comments.N)
      labels.push(arr.date.S.substring(5, 10))
    });

    return [
      {
        label: 'Positive Sentiments',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: pos_sentiments
      },
      {
        label: 'Total Comments',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: total_comments
      }
    ]
  })()

  function getYAxes() {
    let yAxes = [{
      id: "topics",
      position: "left",
      display: true,
      ticks: {
        beginAtZero: true,
      }
    }
    ]
    setYAxes(yAxes)
  }

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: true,
      legend: {
        display: true
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: yAxes
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    }
  }
  )()

  // render
  return (
    <>
      <CChartLine
        {...attributes}
        datasets={defaultDatasets}
        options={defaultOptions}
        labels={labels}
      />
    </>
  )
}


export default MainChartExample
