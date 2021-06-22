import React, { useEffect, useState } from 'react'
import { CCol, CRow, CCard, CCardHeader, CCardBody, CListGroup, CButton, CCollapse, CListGroupItem, CImg, CBadge, CCardImg } from "@coreui/react"
import { useDispatch, useSelector } from 'react-redux'
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons"
import { getGoogleFinanceData } from '../../actions/posts';
import { useDataContext } from "./DataContext";
import moment from "moment";


const GoogleNews = () => {

  const dispatch = useDispatch();

  const [expandTickerNews, setExpandTickerNews] = useState(false)
  const { chartTicker, newsInfo, setNewsInfo } = useDataContext()
  const googleFinanceData = useSelector((state) => state.google_finance_data);

  useEffect(() => {
    dispatch(getGoogleFinanceData(chartTicker))
  }, [chartTicker])

  setNewsInfo(googleFinanceData);

  function getNewsCard(newsPiece) {
    return (
      <CListGroupItem href={newsPiece.url} key={`news-${newsPiece.uuid}`}>

        <CRow>
          <CCol xs={12} md={6} className="flex-column align-items-center">
            <CCardImg src={newsPiece.preview_image_url} />
          </CCol>
          <CCol xs={12} md={6} className="mt-2">
            <h4 className="text-dark">
              {newsPiece.title} ({newsPiece.source})
            </h4>
            <p className="text-dark">
              {moment(newsPiece.published_at).local().format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            <p>
              {newsPiece.preview_text}
            </p>
          </CCol>
        </CRow>
      </CListGroupItem>
    )
  }

  function getBadgesForNews(newsPiece) {
    return (
      <CRow>
        <h5 className="m-1"><CBadge color="primary">
          {newsPiece.source}
        </CBadge></h5>
      </CRow>
    )
  }

  return ( // can add a filter just like the reddit posts list (allow you to change tickers on news list as well as maybe filter by source? like benzinga, yahoo_finance, etc.) 
    <CRow>
      <CCol className="mt-3">
          <CCardHeader id="headingOne">
            <CButton 
              block 
              color="link" 
              className="p-0" 
              onClick={() => setExpandTickerNews(!expandTickerNews)}
            >
              <CRow>
                <CCol>
                  <h5 className="d-inline-block float-left h-100 mb-0">News for {chartTicker}</h5>
                  {expandTickerNews ? <CaretUpFill className="d-inline-block float-right h-100"/> :
                  <CaretDownFill className="d-inline-block float-right h-100"/>}
                </CCol>
              </CRow>
            </CButton>
          </CCardHeader>
          <CCollapse show={expandTickerNews}>
            <CCard>

              {/* <CCardHeader>
              </CCardHeader> */}

              {/* <CCardBody>
                <CListGroup>
                  {newsInfo.map((newsPiece) => {
                    return getNewsCard(newsPiece)
                  })}
                </CListGroup>

              </CCardBody> */}

            </CCard>
          </CCollapse>
      </CCol>
    </CRow>
  )
}

export default GoogleNews;