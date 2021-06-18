import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProcessedTickerList } from '../../actions/posts';
import { Typeahead } from "react-bootstrap-typeahead";
// import { getSearchOptions } from "./utils";
import { useDataContext } from "./DataContext";
import {
  CCard, CCardBody, CRow, CCol, CFormText
} from "@coreui/react"

const FilterBoard = () => {

  const {
    chartTicker, searchValue, processedTickers,
    setChartTicker, setSearchValue, setProcessedTickers
  } = useDataContext()

  // initial: []
  const processedTickerList = useSelector((state) => state.processed_ticker_list);

  useEffect(() => {
    setProcessedTickers(processedTickerList);
  }, [chartTicker, processedTickerList])

  function handleClickedTickerChange(text) {
    setSearchValue(text)
    if (text.length > 0) {
      setChartTicker(text[0]);
    }
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="3">
              {processedTickers &&
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  onChange={handleClickedTickerChange}
                  options={processedTickers.sort()}
                  placeholder="Select Ticker"
                  selected={searchValue}
                  size="lg"
                />
              }
              <CFormText className="text-center"><strong>Search and select</strong> a ticker to view data for</CFormText>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default FilterBoard
