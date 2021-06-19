import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCollapse,
  CDataTable,
  CBadge,
} from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons"
import { getStyle } from '@coreui/utils'
import { useDispatch, useSelector } from 'react-redux'
import { getYahooFinanceData } from '../../actions/posts';
import { useDataContext } from "./DataContext";

import { financialsToLabel, keyStatisticsToLabel, recommendationToLabel } from "./FinancialDataLabels"

const brandGreen = "#0f802d"
const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'
const brandWarning = getStyle("warning") || "#ffbc12"

const recommendationToStyle = {
  "strongSell": brandDanger,
  "sell": brandWarning,
  "hold": brandInfo,
  "buy": brandSuccess,
  "strongBuy": brandGreen
}

//simple yahoo finance table with pretty UI
const TickerFinancialsTable = () => {

  const dispatch = useDispatch();
  
  const [expandTickerFinancials, setExpandTickerFinancials] = useState()
  const { chartTicker, tickerInfo, setTickerInfo } = useDataContext()
  const yahooFinanceData = useSelector((state) => state.yahoo_finance_data);

  useEffect(() => {
      dispatch(getYahooFinanceData(chartTicker))
  }, [chartTicker])
  
  setTickerInfo(yahooFinanceData);
  
  function getBadgeForAnalystRecommendation(item) {
    const recommendationToBadge = {
      "hold": "primary",
      "underperform": "danger",
      "buy": "success"
    }
    return (
      <CBadge color={recommendationToBadge[item["Analyst Recommendation"]]}>
        {item["Analyst Recommendation"]}
      </CBadge>
    )
  }
  function getFinancialDataTable(labels, info, financialDataType) {
    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    let fields = Object.keys(labels).filter((key) => Object.keys(info[financialDataType]).includes(key))
    let processedFields = []
    fields.forEach((field) => {
      processedFields.push(labels[field])
    })
    let processedValues = {}
    const convertToPercentFields = ["heldPercentInsiders", "heldPercentInstitutions", "shortPercentOfFloat"]
    fields.forEach((field) => {
      if (tickerInfo[financialDataType][field]) {
        processedValues[labels[field]] = numberWithCommas(convertToPercentFields.includes(field) ? Math.round(tickerInfo[financialDataType][field] * 10000) / 100 : tickerInfo[financialDataType][field])
      }
      else {
        processedValues[labels[field]] = "None"
      }
    })

    return (
      <CDataTable
        items={[processedValues]}
        fields={processedFields}
        scopedSlots={{
          'Analyst Recommendation':
            (item) => (
              <td>
                {getBadgeForAnalystRecommendation(item)}
              </td>
            )

        }}
      />
    )
  }

  function getAnalystRecommendationsPieCharts(info) {

    return (
      info.recommendationTrend.trend.map((trendInfo) => {
        let recommendationData = []
        let recommendationColors = []
        let recommendationLabels = []
        let hasDataForTrend = false
        Object.keys(recommendationToStyle).forEach((recommendation) => {
          if (trendInfo[recommendation] > 0) {
            recommendationData.push(trendInfo[recommendation])
            recommendationColors.push(recommendationToStyle[recommendation])
            recommendationLabels.push(recommendationToLabel[recommendation])
            hasDataForTrend = true
          }
        })
        if (!hasDataForTrend) {
          return
        }
        return (
          <CCol xs={12} md={6}
            key={`pie-chart-${chartTicker}-${trendInfo.period}`}
          >
            <CCard>
              <CCardHeader>
                {trendInfo.period}
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  datasets={[
                    {
                      backgroundColor: recommendationColors,
                      data: recommendationData
                    },
                  ]}
                  labels={recommendationLabels}
                  options={{
                    tooltips: {
                      enabled: true
                    }
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        )
      })
    )
  }

  return (
    <CRow>
      <CCol className="mt-3">
        <CCardHeader className="mb-3">
          <CButton
            block
            color="link"
            className="p-0"
            onClick={() => setExpandTickerFinancials(!expandTickerFinancials)}
          >
            <CRow>
              <CCol>
                <h5 className="d-inline-block float-left h-100 mb-0">Financials/Key Data for {chartTicker}</h5>
                {expandTickerFinancials ? <CaretUpFill className="d-inline-block float-right h-100" /> :
                  <CaretDownFill className="d-inline-block float-right h-100" />}
              </CCol>
            </CRow>
          </CButton>
        </CCardHeader>
        <CCollapse show={expandTickerFinancials}>
          <CCard>
            <CCardHeader>
              Financials
            </CCardHeader>
            <CCardBody>
              {tickerInfo && "financialData" in tickerInfo && getFinancialDataTable(financialsToLabel, tickerInfo, "financialData")}
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              Key Statistics
            </CCardHeader>
            <CCardBody>
              {tickerInfo && "defaultKeyStatistics" in tickerInfo && getFinancialDataTable(keyStatisticsToLabel, tickerInfo, "defaultKeyStatistics")}
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              Analyst Recommendations
            </CCardHeader>
            <CCardBody>
              <CRow>
                {tickerInfo && "recommendationTrend" in tickerInfo && getAnalystRecommendationsPieCharts(tickerInfo)}
              </CRow>
            </CCardBody>
          </CCard>
        </CCollapse>
      </CCol>
    </CRow>
  )
}
export default TickerFinancialsTable;