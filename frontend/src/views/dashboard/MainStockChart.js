import React, { useState, useEffect } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getData, setSearchValue, setClickedTicker } from '../../actions/posts';
import { Typeahead } from "react-bootstrap-typeahead"
import { getSearchOptions } from "../../reusable/utils"
// import { DynamoDBClient, GetItemCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
// import AWS from 'aws-sdk';
// var dynamodb = new AWS.DynamoDB({ region: process.env.REGION });
import { store } from '../../index';

import {
  CCard, CCardBody, CRow, CCol, CButton, CButtonGroup, CCardFooter, CProgress, CLabel, CSelect, CSwitch, CPopover,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormText, CTooltip
} from "@coreui/react"

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = attributes => {

  //get the dispatch
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState([]);
  const [yAxes, setYAxes] = useState([])

  //current ticker that is display on the main stock chart. Default is "SPY".
  const clicked_ticker = useSelector((state) => state.clicked_ticker);
  //data to use for charts
  const data = useSelector((state) => state.posts);
  //extract string array of tickers from the processedTickerList
  const processedTickerList = useSelector((state) => state.processed_ticker_list);
  //use this array to display a list of tickers 
  let processed_ticker_list = [];
  if (processedTickerList === "all sources") { processed_ticker_list = ["all sources"] }
  else { processedTickerList.forEach(arr => { processed_ticker_list.push(arr.ticker.S) }); }

  // this is units in the x-axis: date. It is initialized inside useEffect...
  let labels = [];

  useEffect(() => {
    //get a default chart for SPY.
    dispatch(getData(clicked_ticker));
  }, [clicked_ticker])

  //setting up for the initial chart, in this case, SPY.
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

  // the triggered function in the ticker input box
  function handleClickedTickerChange(text) {
    setSearchValue(text)
    if (text.length > 0) {
      if (text[0] === "all tickers") { dispatch(setClickedTicker("all tickers")); }
      else { dispatch(setClickedTicker(text[0])); }
    }
  }

  // render
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="3">
              {processedTickerList &&
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  onChange={handleClickedTickerChange}
                  options={getSearchOptions(processed_ticker_list)}
                  placeholder="SPY"
                  selected={searchValue}
                  size="lg"
                />
              }
              <CFormText className="text-center"><strong>Search and select</strong> a ticker to view data for</CFormText>
            </CCol>

          </CRow>
        </CCardBody>
      </CCard>


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
