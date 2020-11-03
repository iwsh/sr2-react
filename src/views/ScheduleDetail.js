import React, { Component } from 'react'
import axios from 'axios'

import {
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInvalidFeedback,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSwitch,
  CValidFeedback
} from '@coreui/react'

class ScheduleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      date: new Date(),
      dailyData: [],
      error: '',
      putdata: {date: this.props.item.date, title: this.props.item.title, started_at: this.props.item.started_at, ended_at: this.props.item.ended_at, allday: this.props.item.allday, detail: this.props.item.detail},
      editModal: false,
      deleteModal: false,
    };
  }

  render() {
    // 以下、各日のスケジュール詳細表示用
    // ===ココカラ===
    const deleteSchedules = () => {
      axios
        .delete(this.props.url_schedules + '/' + this.props.item.id, {
          headers: { "AuthHeader": window.btoa(this.props.email + ":" + this.props.password) },
          data: {}
        })
        .then((results) => {
          console.log(results.data);
          this.setState(
            {error: '' },
            () => this.props.getSchedules(),
            this.props.setDailySchedules(this.props.date),
            changeDeleteModal()
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
              this.setState({ error: 'IDには数値のみが指定できます。' })
            } else if (error.response.status == '403') {
              this.setState({ error: '削除できるのは自身のスケジュールのみです。' })
            } else if (error.response.status == '404') {
              this.setState({ error: 'そのスケジュールはすでに削除されています。' })
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
        })
    }

    const putSchedules = () => {
      axios
      .put(this.props.url_schedules + '/' + this.props.item.id, this.state.putdata, {
        headers: { "AuthHeader": window.btoa(this.props.email + ":" + this.props.password) }
      })
      .then((results) => {
        console.log(results.data);
        this.setState(
          {error: '' },
          () => this.props.getSchedules(),
          this.props.setDailySchedules(this.props.date),
          changeEditModal()
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
            this.setState({ error: '入力エラー：入力内容を確認してください。' })
          } else if (error.response.status == '403') {
            this.setState({ error: '更新できるのは自身のスケジュールのみです。' })
          } else if (error.response.status == '404') {
            this.setState({ error: 'そのスケジュールはすでに削除されています。' })
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
      })
    }

    const changeEditModal = () => {
      this.setState({
        putdata: {date: this.props.item.date, title: this.props.item.title, started_at: this.props.item.started_at, ended_at: this.props.item.ended_at, detail: this.props.item.detail},
        editModal: !this.state.editModal,
        error: ''
      })
    }

    const changePutAllday = () => {
      this.setState({putdata: {date: this.state.putdata.date, title: this.state.putdata.title, started_at: this.state.putdata.started_at, ended_at: this.state.putdata.ended_at, allday: !this.state.putdata.allday, detail: this.state.putdata.detail}});
    }

    const changePutDate = (e) => {
      this.setState({putdata: {date: e.target.value, title: this.state.putdata.title, started_at: this.state.putdata.started_at, ended_at: this.state.putdata.ended_at, allday: this.state.putdata.allday, detail: this.state.putdata.detail}});
    }

    const changePutTitle = (e) => {
      this.setState({putdata: {date: this.state.putdata.date, title: e.target.value, started_at: this.state.putdata.started_at, ended_at: this.state.putdata.ended_at, allday: this.state.putdata.allday, detail: this.state.putdata.detail}});
    }

    const changePutStartedAt = (e) => {
      this.setState({putdata: {date: this.state.putdata.date, title: this.state.putdata.title, started_at: e.target.value, ended_at: this.state.putdata.ended_at, allday: this.state.putdata.allday, detail: this.state.putdata.detail}});
    }

    const changePutEndedAt = (e) => {
      this.setState({putdata: {date: this.state.putdata.date, title: this.state.putdata.title, started_at: this.state.putdata.started_at, ended_at: e.target.value, allday: this.state.putdata.allday, detail: this.state.putdata.detail}});
    }

    const changePutDetail = (e) => {
      this.setState({putdata: {date: this.state.putdata.date, title: this.state.putdata.title, started_at: this.state.putdata.started_at, ended_at: this.state.putdata.ended_at, allday: this.state.putdata.allday, detail: e.target.value}});
    }

    const changeDeleteModal = () => {
      this.setState({
        deleteModal: !this.state.deleteModal,
        error: ''
      })
    }
    // ===ココマデ===

    return (
      <div>
        {/* ===ココカラ（スケジュール）=== */}
          <CCardBody>
            <p className="text-muted">Detail: {this.props.item.detail}</p>
            <CButton size="sm" color="info" onClick={changeEditModal}>
              Edit
            </CButton>
            <CButton size="sm" color="danger" onClick={changeDeleteModal} className="ml-1">
              Delete
            </CButton>
          </CCardBody>
        {/* ===ココマデ（スケジュール）=== */}
        {/* ===ココカラ（モーダル　編集）=== */}
        <CModal
          show={this.state.editModal}
          onClose={changeEditModal}
          color="info"
        >
          <CModalHeader closeButton>
            <CModalTitle>スケジュール　編集</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {this.state.error != '' && <p style={{color:'#ff0000'}}>{this.state.error}</p>}
            <CForm>
              <CFormGroup className={this.state.emailChecked && "was-validated"}>
                <CInputGroup className="mb-3">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Date
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="date" className="form-control-warning" id="inputWarning1i" value={this.state.putdata.date} onChange={changePutDate.bind(this)} onBlur={() => this.setState({emailChecked: true})} required />
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
                  <CInput type="text" className="form-control-warning" id="inputWarning2i" placeholder="title" value={this.state.putdata.title} onChange={changePutTitle.bind(this)} onBlur={() => this.setState({passwordChecked: true})} required />
                  <CInvalidFeedback className="help-block">
                    Neccessary
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">
                    OK
                  </CValidFeedback>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="8">
                  <CFormGroup className={this.state.passwordChecked && "was-validated"}>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          From
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="time" className="form-control-warning" id="inputWarning2i" value={this.state.putdata.started_at} onChange={changePutStartedAt.bind(this)} onBlur={() => this.setState({passwordChecked: true})} disabled={this.state.putdata.allday} required />
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
                      <CInput type="time" className="form-control-warning" id="inputWarning2i" value={this.state.putdata.ended_at} onChange={changePutEndedAt.bind(this)} onBlur={() => this.setState({passwordChecked: true})} disabled={this.state.putdata.allday} required />
                      <CInvalidFeedback className="help-block">
                        Neccessary
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">
                        OK
                      </CValidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CInputGroup className="mb-4">
                    <CLabel htmlFor="allday">All-Day　</CLabel>
                    <CSwitch
                      className="mr-1"
                      color="info"
                      labelOn={'\u2713'} //check mark
                      labelOff={'\u2715'} //cross mark
                      checked={this.state.putdata.allday}
                      onChange={changePutAllday}
                    />
                  </CInputGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup className={this.state.passwordChecked && "was-validated"}>
                <CInputGroup className="mb-4">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      Detail
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput type="text" className="form-control-warning" id="inputWarning2i" placeholder="detail" value={this.state.putdata.detail} onChange={changePutDetail.bind(this)} onBlur={() => this.setState({passwordChecked: true})} required />
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
            <CButton color="info" onClick={putSchedules}>送信</CButton>{' '}
            <CButton color="secondary" onClick={changeEditModal}>Cancel</CButton>
          </CModalFooter>
        </CModal>
        {/* ===ココマデ（モーダル　編集）=== */}
        {/* ===ココカラ（モーダル　削除）=== */}
        <CModal
          show={this.state.deleteModal}
          onClose={changeDeleteModal}
          color="danger"
        >
          <CModalHeader closeButton>
            <CModalTitle>スケジュール　削除</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>本当にこの予定を削除してもよろしいですか？</p>
            <p>Date: {this.props.item.date}</p>
            <p>Title: {this.props.item.title}</p>
            <p>Detail: {this.props.item.detail}</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={deleteSchedules}>送信</CButton>{' '}
            <CButton color="secondary" onClick={changeDeleteModal}>Cancel</CButton>
          </CModalFooter>
        </CModal>
        {/* ===ココマデ（モーダル　削除）=== */}
      </div>
    )
  }
}

export default ScheduleDetail