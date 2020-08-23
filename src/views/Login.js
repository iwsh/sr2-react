import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CLabel,
  CPopover,
  CRow,
  CValidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'dark',
      url_login: 'http://localhost:3001/login',
      email: '',
      password: '',
      isLoggedIn: false,
      data: [],
    };
  }

  changeLoginEmail(e) {
    this.setState({email: e.target.value});
  }
  changeLoginPassword(e) {
    this.setState({password: e.target.value});
  }
  handleDropdownChange(e) {
    this.setState({ color: e.target.value });
  }
  login(email, password) {
    if (this.validationCheck(email, password)) {
      axios
        .get(this.state.url_login, {
          headers: { "email": window.btoa(email), "password": window.btoa(password) },
          data: {}
        })
        .then((results) => {
          console.log(results.data);
          if (typeof results.data.message == "undefined") {
            this.setState({
              data: results.data,
              isLoggedIn: true,
            });
          };
        },)
    } else {
      // エラーメッセージ（バリデーション）
    }
  }
  validationCheck(email, password) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email == '' || password == '' || !regex.test(email)){
      return false
    } else {
      return true
    }
  }

  render() {
    return (
      (this.state.isLoggedIn == true)? (
        <Redirect to={{
          pathname: '/calendar',
          state: { data: this.state.data }
        }}/>
      ) : (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <select id="dropdown" onChange={this.handleDropdownChange.bind(this)}>
            <option value="dark">Dark</option>
            <option value="primary">Blue</option>
            <option value="secondary">Gray</option>
            <option value="danger">Red</option>
          </select>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm className="was-validated">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CFormGroup>
                        <CLabel htmlFor="inputWarning1i">email</CLabel>
                        <CInput type="email" className="form-control-warning" id="inputWarning1i" placeholder="email" value={this.state.email} onChange={this.changeLoginEmail.bind(this)} autoComplete="email" required />
                        <CInvalidFeedback className="help-block">
                          Neccessary & E-mail format
                        </CInvalidFeedback>
                        <CValidFeedback className="help-block">OK</CValidFeedback>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="inputWarning2i">password</CLabel>
                        <CInput type="password" className="form-control-warning" id="inputWarning2i" placeholder="password" value={this.state.password} onChange={this.changeLoginPassword.bind(this)} autoComplete="password" required />
                        <CInvalidFeedback className="help-block">
                          Neccessary
                        </CInvalidFeedback>
                        <CValidFeedback className="help-block">OK</CValidFeedback>
                      </CFormGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color={this.state.color} className="px-4" onClick={this.login.bind(this, this.state.email, this.state.password)} >Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CPopover header="Forgot password?"
                            content={`Please send your e-mail to the e-mail address symitems.info@gmail.com.`}
                            placement="bottom"
                            interactive={true}
                            trigger="click"
                          >
                            <CButton color="link" className="px-0">
                              Forgot password?
                            </CButton>
                          </CPopover>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className={`text-white bg-${this.state.color} py-5 d-md-down-none`} style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>If you want to create a new account, please send your e-mail to the e-mail address below.</p>
                      <p>symitems.info@gmail.com</p>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      )
    );
  }
}

export default Login