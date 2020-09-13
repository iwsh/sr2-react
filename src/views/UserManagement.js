import React, { Component } from "react";
import axios from "axios";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
  CTabContent,
  CTabPane,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect
} from "@coreui/react";

const ErrorMessage = (props) => {
  const errorstyles = {
    color: "#fc0101",
  };
  const messages = props.message;

  return (
    <React.Fragment>
      {messages !== null &&
        messages.map((message) => (
          <p className="error" style={errorstyles} key={message}>
            {message}
          </p>
        ))}
    </React.Fragment>
  );
};

class UserManagement extends Component {
  constructor() {
    super();
    this.state = {
      url: "http://localhost:3001/users",
      data: [],
      activeTab: -1,
      deleteModal: false,
      editModal: false,
      messages: [],
      selectedUserInfo: null,
      targetUser: {},
    };
    this.getUserList();
  }

  getUserList() {
    axios.get(this.state.url).then((results) => {
      this.setState({
        data: results.data,
      });
    });
  }

  setActiveTab(activeTab) {
    this.setState({
      activeTab: activeTab,
    });
  }

  postUser(userInfo) {
    axios
      .post(this.state.url_users, userInfo)
      .then(() => {
        this.getUserList();
        this.setState({ postModal: !this.state.deleteModal });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status); // 例：400
          console.log(error.response.statusText); // Bad Request
          console.log(error.response.headers);
          this.getUserList();
          this.setState({ deleteModal: !this.state.deleteModal });
          this.setState({ messages: ["Error"] });
        } else {
          this.setState({ messages: ["Error"] });
          console.log(error);
        }
      });
  }

  editUser() {
    this.setState({ messages: [] });
    if (!this.state.targetUser.password) {
      delete this.state.targetUser.password;
    }
    if (this.validiteTargetUser()) {
      axios
        .patch(this.state.url + "/" + this.state.targetUser.id, this.state.targetUser)
        .then(() => {
        this.getUserList();
        this.setState({ editModal: !this.state.editModal });
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status); // 例：400
            console.log(error.response.statusText); // Bad Request
            console.log(error.response.headers);
            this.getUserList();
            this.setState({ deleteModal: !this.state.deleteModal });
            this.setState({ messages: ["Error"] });
          } else {
            this.setState({ messages: ["Error"] });
            console.log(error);
          }
        });
    } else {
      this.setState({ messages: [...this.state.messages, "入力情報が正しくありません"] });
    }
  }

  deleteUser() {
    axios
      .delete(this.state.url + "/" + this.state.targetUser.id)
      .then(() => {
        this.getUserList();
        this.setState({ deleteModal: !this.state.deleteModal });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status); // 例：400
          console.log(error.response.statusText); // Bad Request
          console.log(error.response.headers);
          this.getUserList();
          this.setState({ deleteModal: !this.state.deleteModal });
          this.setState({ messages: ["ユーザを削除できません"] });
        } else {
          this.setState({ messages: ["ユーザを削除できません"] });
          console.log(error);
        }
      });
  }

  filterUserById(id) {
    const filteredList = this.state.data.filter((item) => {
      return item.id === id;
    });
    if (filteredList.length === 1) {
      return filteredList[0];
    } else {
      return undefined;
    }
  }

  displayAdmin(is_admin){
    if (is_admin) return "Admin";else return "Normal";
  }

  validiteTargetUser() {
    if (!this.state.targetUser.id && this.state.targetUser.id !== 0) {
      this.setState({ messages: [...this.state.messages, "Validation: ID is invaild"] });
    }
    if (!this.state.targetUser.name) {
      this.setState({ messages: [...this.state.messages, "Validation: name is invaild"] });
    }
    if (this.state.targetUser.is_admin == null) {
      this.setState({ messages: [...this.state.messages, "Validation: admin flag is invalid"] });
    }
    if (!this.state.targetUser.email) {
      this.setState({ messages: [...this.state.messages, "Validation: email is invaild"] });
    }

    if (this.state.messages.length &&
      this.state.messages[0].indexOf("Validation: ") === 0) return false;
    return true;
  }

  handleChangeName(event) {
    var newTargetUser = {...this.state.targetUser};
    newTargetUser.name = event.target.value;
    this.setState({ targetUser: newTargetUser});
  }

  handleChangeEmail(event) {
    var newTargetUser = {...this.state.targetUser};
    newTargetUser.email = event.target.value;
    this.setState({ targetUser: newTargetUser });
  }

  handleChangeIsAdmin(event) {
    var newTargetUser = {...this.state.targetUser};
    newTargetUser.is_admin = event.target.value;
    this.setState({ targetUser: newTargetUser });
  }

  handleChangePassword(event) {
    var newTargetUser = {...this.state.targetUser};
    newTargetUser.password = event.target.value;
    this.setState({ targetUser: newTargetUser });
  }

  render() {
    return (
      <div className="UserManagement">
        <h1>ユーザ管理画面</h1>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                ユーザ一覧
                <small> クリックすると詳細が表示されます</small>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="4">
                    <CListGroup id="list-tab" role="tablist">
                      {this.state.data.map((userInfo) => {
                        return (
                          <CListGroupItem
                            onClick={() =>
                              this.setState({ activeTab: userInfo.id })
                            }
                            action
                            active={this.state.activeTab === userInfo.id}
                          >
                            {userInfo.name}
                          </CListGroupItem>
                        );
                      })}
                    </CListGroup>
                  </CCol>
                  <CCol xs="8">
                    <CTabContent>
                      {this.state.data.map((userInfo) => {
                        return (
                          <CTabPane
                            active={this.state.activeTab === userInfo.id}
                          >
                            <p>ID: {userInfo.id}</p>
                            <p>Name: {userInfo.name}</p>
                            <p>E-mail: {userInfo.email}</p>
                            <p>UserType: {this.displayAdmin(userInfo.is_admin)}</p>
                            <CButton
                              color="dark"
                              onClick={() =>
                                this.setState({
                                  messages: [],
                                  editModal: !this.state.editModal,
                                  targetUser: this.filterUserById(
                                    this.state.activeTab
                                  ),
                                })
                              }
                              className="mr-1"
                            >
                              Edit
                            </CButton>
                            <CButton
                              color="danger"
                              onClick={() => {
                                this.setState({
                                  messages: [],
                                  deleteModal: !this.state.deleteModal,
                                  targetUser: this.filterUserById(
                                    this.state.activeTab
                                  ),
                                });
                              }}
                              className="mr-1"
                            >
                              Delete
                            </CButton>
                          </CTabPane>
                        );
                      })}
                    </CTabContent>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CModal
          show={this.state.deleteModal}
          onClose={() =>
            this.setState({ deleteModal: !this.state.deleteModal })
          }
          color="danger"
        >
          <CModalHeader closeButton>
            <CModalTitle>ユーザの削除</CModalTitle>
          </CModalHeader>
          <CModalBody>
            このユーザを削除します。 削除したユーザは復元できません。
            <ErrorMessage message={[this.state.messages]} />
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={() => this.deleteUser()}>
              Delete User
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() =>
                this.setState({ deleteModal: !this.state.deleteModal })
              }
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal
          show={this.state.editModal}
          onClose={() => this.setState({ editModal: !this.state.editModal })}
          color="dark"
        >
          <CModalHeader closeButton>
            <CModalTitle>ユーザの編集</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>このユーザを編集します。</p>
            <CForm wasValidated>
            <CFormGroup>
                <CLabel htmlFor="name">Name</CLabel>
                <CInput
                  valid
                  id="name"
                  required
                  value={this.state.targetUser.name}
                  onChange={this.handleChangeName.bind(this)}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="email">Email</CLabel>
                <CInput
                  valid
                  id="email"
                  required
                  value={this.state.targetUser.email}
                  onChange={this.handleChangeEmail.bind(this)}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="is_admin">User Type</CLabel>
                <CSelect
                  valid
                  id="is_admin"
                  value={this.state.targetUser.is_admin}
                  onChange={this.handleChangeIsAdmin.bind(this)}
                >
                  <option value="true">Admin</option>
                  <option value="false">Normal</option>
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="password">Password</CLabel>
                <CInput
                  valid
                  id="password"
                  placeholder="変更のない場合は入力不要"
                  value={this.state.targetUser.password}
                  onChange={this.handleChangePassword.bind(this)}
                />
              </CFormGroup>
            </CForm>
            <ErrorMessage message={[this.state.messages]} />
          </CModalBody>
          <CModalFooter>
            <CButton color="dark" onClick={() => this.editUser()}>
              Edit User
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() =>
                this.setState({ editModal: !this.state.editModal })
              }
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    );
  }
}

export default UserManagement;
