import React, { useState, useEffect } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../actions/posts';
import { useDataContext } from "./DataContext";
import { CCol, CRow, CCard, CCardHeader, CCardBody, CListGroup, CButton, CCollapse, CListGroupItem, CImg, CBadge, CCardImg } from "@coreui/react"
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons"

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'

// this component gets data from the dynamodb
const MainChartExample = attributes => {
  const [expandTickerNews, setExpandTickerNews] = useState(true)

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
    getYAxes();
  }, [chartTicker])
  // }, [])

  const defaultDatasets = (() => {
    const pos_sentiments = []
    const total_comments = []

    data.forEach(arr => {
      // pos_sentiments.push(arr.POS.N)
      // total_comments.push(arr.total_comments.N)
      pos_sentiments.push(parseInt(arr.positives.N, 10))
      total_comments.push(parseInt(arr.mentions.N, 10))

      // labels.push(arr.date.S.substring(5, 10))
      // date: { S: '2021-07-04-10-43' }
      // labels.push(arr.date.S.substring(5, 10)) // do this to get to dates
      labels.push(arr.date.S.substring(0, 13))
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
          radius: 4,
          hitRadius: 10,
          hoverRadius: 8,
          hoverBorderWidth: 3
        }
      }
    }
  }
  )()

  // render
  return (
    <CRow>
      <CCol className="mt-3">
        <CCardHeader className="mb-3">
        <CButton
            block
            color="link"
            className="p-0"
            onClick={() => setExpandTickerNews(!expandTickerNews)}
          >
            <CRow>
              <CCol>
                <h5 className="d-inline-block float-left h-100 mb-0">Financials/Key Data for {chartTicker}</h5>
                {expandTickerNews ? <CaretDownFill className="d-inline-block float-right h-100" /> :
                  <CaretUpFill className="d-inline-block float-right h-100" />}
              </CCol>
            </CRow>
          </CButton>
        </CCardHeader>
        <CCollapse show={expandTickerNews}>

          <CCard>
            <CChartLine
              {...attributes}
              datasets={defaultDatasets}
              options={defaultOptions}
              labels={labels}
            />
          </CCard>
        </CCollapse>
      </CCol>
    </CRow>
  )
}


export default MainChartExample
