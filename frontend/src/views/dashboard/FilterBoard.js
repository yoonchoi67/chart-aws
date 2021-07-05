import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typeahead } from "react-bootstrap-typeahead";
import { useDataContext } from "./DataContext";
import {
  CCard, CCardBody, CRow, CCol, CFormText
} from "@coreui/react"

// just a searchbox that updates the context that will be used by other components below filterboard in the dashboard.js
const FilterBoard = () => {

  const { chartTicker, searchValue, setChartTicker, setSearchValue } = useDataContext()

  const processedTickerList = useSelector((state) => state.processed_ticker_list);

  useEffect(() => {

  }, [])

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
              {processedTickerList &&
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  onChange={handleClickedTickerChange}
                  options={processedTickerList.sort()}
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
