import React from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CFormGroup,
  CInput,
  CForm
} from '@coreui/react'

import MainChartExample from '../charts/MainChartExample.js'

const Dashboard = () => {
  return (
    <>
      <CCard>
        <CCardBody>
          <CForm action="" method="post" className="form-horizontal">
            <CFormGroup row>
              <CCol xs="3">
                <CInput placeholder="Search Ticker" />
              </CCol>
              <CCol xs="3">
                <CInput placeholder="Sources" />
              </CCol>
              <CCol xs="3">
                <CInput placeholder="Days" />
              </CCol>
            </CFormGroup>

            <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
          </CForm>
        </CCardBody>
        
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Visits</div>
              <strong>29.703 Users (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Unique</div>
              <strong>24.093 Users (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>


          </CRow>
        </CCardFooter>
      </CCard>

    </>
  )
}

export default Dashboard
