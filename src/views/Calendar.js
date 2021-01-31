import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import ReactCalendar from 'react-calendar'
import axios from 'axios'

import ScheduleDetail from './ScheduleDetail'

import logo from './../logo.svg';
import './Calendar.css'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CValidFeedback
} from '@coreui/react'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url_schedules: 'http://localhost:3001/schedules',
      name: this.props.location.state.data.name,
      email: this.props.location.state.email,
      password: this.props.location.state.password,
      details: [],
      date: new Date(),
      selectedYM: [(new Date()).getFullYear(), (new Date()).getMonth() + 1],
      dailyData: [],
      monthlyData: [],
      geterror: '',
      posterror: '',
      loading: true,
      addModal: false,
      postdata: {date: '', title: '', started_at: '', ended_at: '', detail: ''},
    };
  }

  componentDidMount() {
    this.getSchedules()
  }

  getSchedules = () => {
    this.setState({
      loading: true,
    }, () => {
      let year = this.state.selectedYM[0]
      let month = this.state.selectedYM[1]
      if (year !== '' && month !== '') {
        axios
          .get(this.state.url_schedules + '/' + year + '/' + month, {
            headers: { "Authorization": `Basic ${window.btoa(this.state.email + ":" + this.state.password)}` },
            data: {}
          })
          .then((results) => {
            console.log(results.data);
            // オブジェクトが空かどうか判定
            if (!Object.keys(results.data).length === false) {
              this.setState({
                monthlyData: results.data,
                loading: false,
              });
            } else {
              this.setState({
                monthlyData: [],
                loading: false,
              });
            }
          },)
          .catch((error) => {
            if (error.response) {
              // このリクエストはステータスコードとともに作成されます
              // 2xx系以外の時にエラーが発生します
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              if (error.response.status == '400') {
                this.setState({ geterror: '年 および 月は入力必須です。', loading: false })
              } else if (error.response.status == '401') {
                this.setState({ geterror: 'Email または Password が違います。', loading: false })
              } else if (error.response.status == '423') {
                this.setState({ geterror: 'アカウントロックされています。解除するためには、管理者に問い合わせてください。', loading: false })
              } else {
                this.setState({ geterror: '不明なエラーです。管理者に問い合わせてください。', loading: false })
              }
            } else if (error.request) {
              // このリクエストはレスポンスが返ってこない時に作成されます。
              // `error.request`はXMLHttpRequestのインスタンスです。
              console.log(error.request);
              this.setState({ geterror: '不明なエラーです。管理者に問い合わせてください。', loading: false })
            } else {
              //それ以外で何か以上が起こった時
              console.log('Error', error.message);
              this.setState({ geterror: '不明なエラーです。管理者に問い合わせてください。', loading: false })
            }
            console.log(error.config);
          });
      } else {
        const geterror = '年 および 月は入力必須です。'
        this.setState({ geterror, loading: false }); // validation NGのときのエラーメッセージ
      }
    })
  }

  changePostDate(e) {
    this.setState({postdata: {date: e.target.value, title: this.state.postdata.title, started_at: this.state.postdata.started_at, ended_at: this.state.postdata.ended_at, detail: this.state.postdata.detail}});
  }

  changePostTitle(e) {
    this.setState({postdata: {date: this.state.postdata.date, title: e.target.value, started_at: this.state.postdata.started_at, ended_at: this.state.postdata.ended_at, detail: this.state.postdata.detail}});
  }

  changePostStartedAt(e) {
    this.setState({postdata: {date: this.state.postdata.date, title: this.state.postdata.title, started_at: e.target.value, ended_at: this.state.postdata.ended_at, detail: this.state.postdata.detail}});
  }

  changePostEndedAt(e) {
    this.setState({postdata: {date: this.state.postdata.date, title: this.state.postdata.title, started_at: this.state.postdata.started_at, ended_at: e.target.value, detail: this.state.postdata.detail}});
  }

  changePostDetail(e) {
    this.setState({postdata: {date: this.state.postdata.date, title: this.state.postdata.title, started_at: this.state.postdata.started_at, ended_at: this.state.postdata.ended_at, detail: e.target.value}});
  }

  render() {
    const weeks = new Array("日","月","火","水","木","金","土")

    // 以下、カレンダー用
    // ===ココカラ===
    //表示された月内の各日に、予定があればその件数を出力
    const getTileContent = ({ date, view }) => {
      // 月表示のときのみ
      if (view !== 'month') {
        return null
      }
      return (
        <p>
          {!Object.keys(this.state.monthlyData).length === false && typeof this.state.monthlyData[date.getDate()] !== "undefined" ? <span style={{color:'#000000'}}>予定{this.state.monthlyData[date.getDate()].length}件</span> : <br />}
        </p>
      )
    }

    const onActiveStartDateChangeFunc = ({activeStartDate, view}) => {
      this.setState({ selectedYM: [activeStartDate.getFullYear(), activeStartDate.getMonth() + 1], monthlyData: [] }, () => {this.getSchedules()})
    }
    // ===ココマデ===

    // 以下、各日のスケジュール表示用
    // ===ココカラ===
    const setDailySchedules = (value) => {
      this.setState({ date: value })
      if (typeof this.state.monthlyData[value.getDate()] !== "undefined") {
        this.setState({ dailyData: this.state.monthlyData[value.getDate()], details: [] })
      } else {
        this.setState({ dailyData: [], details: [] })
      }
    }

    const toggleDetails = (index) => {
      const position = this.state.details.indexOf(index)
      let newDetails = this.state.details.slice()
      if (position !== -1) {
        newDetails.splice(position, 1)
      } else {
        newDetails = [...this.state.details, index]
      }
      this.setState({ details: newDetails })
    }

    const fields = [
      { key: 'title', _style: { width: '50%'} },
      'started_at',
      'ended_at',
      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
      }
    ]

    const changeAddModal = () => {
      if (this.state.addModal) {
        this.setState({
          postdata: {date: '', title: '', started_at: '', ended_at: '', detail: ''},
          addModal: !this.state.addModal,
          posterror: ''
        })
      } else {
        this.setState({
          postdata: {date: this.state.date.getFullYear()+'-'+('0'+(this.state.date.getMonth() + 1)).slice(-2)+'-'+('0'+this.state.date.getDate()).slice(-2), title: '', started_at: '', ended_at: '', detail: ''},
          addModal: !this.state.addModal,
          posterror: ''
        })
      }
    }
    // ===ココマデ===

    const postSchedules = () => {
      axios
        .post(this.state.url_schedules, this.state.postdata, {
          headers: { "Authorization": `Basic ${window.btoa(this.state.email + ":" + this.state.password)}` }
        })
        .then((results) => {
          console.log(results.data);
          this.setState(
            {posterror: '' },
            () => this.getSchedules(),
            setDailySchedules(this.state.date),
            console.log(this.state.dailyData),
            changeAddModal()
          )
        },)
        .catch((error) => {
          if (error.response) {
            // このリクエストはステータスコードとともに作成されます
            // 2xx系以外の時にエラーが発生します
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status == '400') {
              this.setState({ posterror: '入力エラー：入力内容を確認してください。' })
            } else {
              this.setState({ posterror: '不明なエラーです。管理者に問い合わせてください。' })
            }
          } else if (error.request) {
            // このリクエストはレスポンスが返ってこない時に作成されます。
            // `error.request`はXMLHttpRequestのインスタンスです。
            console.log(error.request);
            this.setState({ posterror: '不明なエラーです。管理者に問い合わせてください。' })
          } else {
            //それ以外で何か以上が起こった時
            console.log('Error', error.message);
            this.setState({ posterror: '不明なエラーです。管理者に問い合わせてください。' })
          }
          console.log(error.config);
        })
    }

    return (
      (typeof this.props.location.state.data === "undefined")? (
        // ログイン状態（認証NG）の場合はログイン画面に転送
        <Redirect to={{ pathname: '/login' }}/>
      ) : (
      <div>
        <h2>Symitems Calendar</h2>
        <hr/>
        {/* ===ココカラ（共通ヘッダができるまでの確認用）=== */}
        <p>name:<span style={{color:'#ff0000'}}>{this.state.name}</span></p>
        <p>email:<span style={{color:'#ff0000'}}>{this.state.email}</span></p>
        <p>password:<span style={{color:'#ff0000'}}>{this.state.password}</span></p>
        <p>selectedYM:<span style={{color:'#ff0000'}}>{this.state.selectedYM[0]}/{this.state.selectedYM[1]}</span></p>
        {this.state.geterror != '' && <p style={{color:'#ff0000'}}>{this.state.geterror}</p>}
        {/* ===ココマデ（共通ヘッダができるまでの確認用）=== */}
        <CRow>
          {/* ===ココカラ（カレンダー）=== */}
          <CCol xs="12" md="6">
            <CCard accentColor="success">
              <div className="SampleCalendar">
                <div className="SampleCalendar__container">
                  <main className="SampleCalendar__container__content">
                    <ReactCalendar
                      calendarType='US'
                      locale='ja-JP'
                      maxDate={new Date(2099,12,31)}
                      minDate={new Date(1960,12,31)}
                      minDetail='decade'
                      onActiveStartDateChange={onActiveStartDateChangeFunc}
                      onClickDay={setDailySchedules}
                      showNeighboringMonth={false}
                      tileContent={getTileContent}
                    />
                  </main>
                </div>
              </div>
            </CCard>
          </CCol>
          {/* ===ココマデ（カレンダー）=== */}
          {/* ===ココカラ（スケジュール）=== */}
          <CCol xs="12" md="6">
            <CCard accentColor="success">
              <CCardHeader>
                {this.state.date.getFullYear()}年{this.state.date.getMonth() + 1}月{this.state.date.getDate()}日（{weeks[this.state.date.getDay()]}）の予定
                <CButton size="sm" color="success" onClick={changeAddModal} className="mr-1" className={'float-right mb-0'}>
                  Add
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.dailyData}
                  fields={fields}
                  columnFilter
                  tableFilter
                  footer
                  itemsPerPageSelect
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  scopedSlots = {{
                    'show_details':
                      (item, index)=>{
                        return (
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={()=>{toggleDetails(index)}}
                            >
                              {this.state.details.includes(index) ? 'Hide' : 'Show'}
                            </CButton>
                          </td>
                          )
                      },
                    'details':
                      (item, index)=>{
                        return (
                          <CCollapse show={this.state.details.includes(index)}>
                            <ScheduleDetail item={item} url_schedules={this.state.url_schedules} getSchedules={this.getSchedules.bind(this)} setDailySchedules={setDailySchedules.bind(this)} date={this.state.date} email={this.state.email} password={this.state.password} />
                          </CCollapse>
                        )
                      }
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
          {/* ===ココマデ（スケジュール）=== */}
        </CRow>
        {/* ===ココカラ（モーダル　追加）=== */}
        <CModal
          show={this.state.addModal}
          onClose={changeAddModal}
          color="success"
        >
          <CModalHeader closeButton>
            <CModalTitle>スケジュール　追加</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {this.state.posterror != '' && <p style={{color:'#ff0000'}}>{this.state.posterror}</p>}
            <CForm>
              <CFormGroup className={this.state.emailChecked && "was-validated"}>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Date
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="date" className="form-control-warning" id="inputWarning1i" value={this.state.postdata.date} onChange={this.changePostDate.bind(this)} onBlur={() => this.setState({emailChecked: true})} required />
                  <CInvalidFeedback className="help-block">
                    Neccessary
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
                      Title
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text" className="form-control-warning" id="inputWarning2i" placeholder="title" value={this.state.postdata.title} onChange={this.changePostTitle.bind(this)} onBlur={() => this.setState({passwordChecked: true})} required />
                  <CInvalidFeedback className="help-block">
                    Neccessary
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
                      From
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="time" className="form-control-warning" id="inputWarning2i" value={this.state.postdata.started_at} onChange={this.changePostStartedAt.bind(this)} onBlur={() => this.setState({passwordChecked: true})} required />
                  <CInvalidFeedback className="help-block">
                    Neccessary
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
                      To
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="time" className="form-control-warning" id="inputWarning2i" value={this.state.postdata.ended_at} onChange={this.changePostEndedAt.bind(this)} onBlur={() => this.setState({passwordChecked: true})} required />
                  <CInvalidFeedback className="help-block">
                    Neccessary
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
                      Detail
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text" className="form-control-warning" id="inputWarning2i" placeholder="detail" value={this.state.postdata.detail} onChange={this.changePostDetail.bind(this)} onBlur={() => this.setState({passwordChecked: true})} />
                  <CInvalidFeedback className="help-block">
                    Neccessary
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">
                    OK
                  </CValidFeedback>
                </CInputGroup>
              </CFormGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="success" onClick={postSchedules}>送信</CButton>{' '}
            <CButton color="secondary" onClick={changeAddModal}>Cancel</CButton>
          </CModalFooter>
        </CModal>
        {/* ===ココマデ（モーダル　追加）=== */}

        {/* ===ココカラ（loading中の表示）=== */}
        {this.state.loading ? (
          <div className="Loading">
            <header className="Loading-header">
              <img src={logo} className="Loading-logo" alt="logo" />
              <p>
                Now Loading...
              </p>
            </header>
          </div>
        ) : (
          <div></div>
        )}
        {/* ===ココマデ（loading中の表示）=== */}
      </div>
      )
    );
  }
}

export default Calendar