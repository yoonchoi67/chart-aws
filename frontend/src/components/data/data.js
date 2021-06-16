import React from 'react';
import { useSelector } from 'react-redux';
import {
    CCard,
    CCardBody,
    CForm,
    CFormGroup,
    CCol,
    CInput,
    CFormGroup,
    CInput,
    CForm
} from '@coreui/react'

const Posts = () => {
    const posts = useSelector((state) => state.posts);

    return (
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
                </CForm>
            </CCardBody>
        </CCard>
    )
};

export default Posts;