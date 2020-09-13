import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,

} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const UserForms = () => {

  return (
    <CCol xs="12" sm="4">
      <CCard>
        <CCardHeader>Example Form</CCardHeader>
        <CCardBody>
          <CForm action="" method="post">
            <CFormGroup>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  id="username1"
                  name="username1"
                  placeholder="Username"
                  autoComplete="name"
                />
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-envelope-closed" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="email"
                  id="email1"
                  name="email1"
                  placeholder="Email"
                  autoComplete="username"
                />
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-asterisk" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="password"
                  id="password1"
                  name="password1"
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CSwitch className={'mx-1'} shape={'pill'} color={'primary'} defaultChecked />
            </CFormGroup>
            <CFormGroup className="form-actions">
              <CButton type="submit" size="sm" color="success">
                Submit
              </CButton>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default UserForms;
