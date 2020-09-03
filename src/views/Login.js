import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
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
  CPopover,
  CRow,
  CValidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url_login: 'http://localhost:3001/login',
      email: '',
      password: '',
      isLoggedIn: false,
      data: [],
      error: '',
      emailChecked: false,
      passwordChecked: false,
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
    const error = this.validationCheck(email, password);
    if (error == '') {
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
        .catch((error) => {
          if (error.response) {
            // このリクエストはステータスコードとともに作成されます
            // 2xx系以外の時にエラーが発生します
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status == '401') {
              this.setState({ error: 'Email または Password が違います。' })
            } else if (error.response.status == '423') {
              this.setState({ error: 'アカウントロックされています。解除するためには、管理者に問い合わせてください。' })
            } else {
              this.setState({ error: '不明なエラーです。管理者に問い合わせてください。' })
            }
          } else if (error.request) {
            // このリクエストはレスポンスが返ってこない時に作成されます。
            // `error.request`はXMLHttpRequestのインスタンスです。
            console.log(error.request);
            this.setState({ error: '不明なエラーです。管理者に問い合わせてください。' })
          } else {
            //それ以外で何か以上が起こった時
            console.log('Error', error.message);
            this.setState({ error: '不明なエラーです。管理者に問い合わせてください。' })
          }
          console.log(error.config);
        });
    } else {
      this.setState({ error }); // validation NGのときのエラーメッセージ
    }
  }
  validationCheck(email, password) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let error = '';
    if (  email == '' ) {
      if ( password == '' ) {
        error = 'Email と Password は入力必須です。';
      } else {
        error = 'Email は入力必須です。';
      }
    } else if ( !regex.test(email) ) {
      if ( password == '' ) {
        error = 'Email はメールアドレスのフォーマットが必須、Password は入力必須です。';
      } else {
        error = 'Email はメールアドレスのフォーマットが必須です。';
      }
    } else if ( password == '' ) {
      error = 'Password は入力必須です。';
    }
    return error
  }

  render() {
    return (
      (this.state.isLoggedIn === true)? (
        <Redirect to={{
          pathname: '/calendar',
          state: { data: this.state.data }
        }}/> // ログイン状態（認証OK）の場合はカレンダー画面に転送（ユーザデータを渡す）
      ) : (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                  {this.state.error != '' && <p style={{color:'#ff0000'}}>{this.state.error}</p>}
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CFormGroup className={this.state.emailChecked && "was-validated"}>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="email" className="form-control-warning" id="inputWarning1i" placeholder="email" value={this.state.email} onChange={this.changeLoginEmail.bind(this)} onBlur={() => this.setState({emailChecked: true})} autoComplete="email" required />
                          <CInvalidFeedback className="help-block">
                            Neccessary & Needed E-mail format
                          </CInvalidFeedback>
                          <CValidFeedback className="help-block">
                            OK
                          </CValidFeedback>
                        </CInputGroup>
                      </CFormGroup>
                      <CFormGroup className={this.state.passwordChecked && "was-validated"}>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="password" className="form-control-warning" id="inputWarning2i" placeholder="password" value={this.state.password} onChange={this.changeLoginPassword.bind(this)} onBlur={() => this.setState({passwordChecked: true})} autoComplete="password" required />
                          <CInvalidFeedback className="help-block">
                            Neccessary
                          </CInvalidFeedback>
                          <CValidFeedback className="help-block">
                            OK
                          </CValidFeedback>
                        </CInputGroup>
                      </CFormGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="dark" className="px-4" onClick={this.login.bind(this, this.state.email, this.state.password)} >Login</CButton>
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
                <CCard className={`text-white bg-dark py-5 d-md-down-none`} style={{ width: '44%' }}>
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