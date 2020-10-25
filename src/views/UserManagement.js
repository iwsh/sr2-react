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
  CSelect,
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
      email: 'gerounnko@gmail.com',
      password: 'gerounnko',
      activeTab: -127,
      createModal: false,
      editModal: false,
      deleteModal: false,
      messages: [],
      selectedUserInfo: null,
      targetUser: {},
      blankUser: {name: "", email: "", is_admin: false, password: ""},
    };
    this.getUserList();
  }

  getUserList() {
    axios.get(
      this.state.url,
      {
        headers: {
          "email": window.btoa(this.state.email),
          "password": window.btoa(this.state.password)
        }
      }
    ).then((results) => {
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

  createUser() {
    this.setState({ messages: [] });
    if (this.validiteTargetUser("post")) {
      axios
        .post(
          this.state.url,
          this.state.targetUser,
          {
            headers: {
              "email": window.btoa(this.state.email),
              "password": window.btoa(this.state.password)
            }
          }
        ).then(() => {
          this.getUserList();
          this.setState({ createModal: false });
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
            this.setState({ messages: ["Error"] });
          } else {
            this.setState({ messages: ["Error"] });
            console.log(error);
          }
        });
    } else {
      // this.setState({ messages: [...this.state.messages, "入力情報が正しくありません"] });
    }
  }

  editUser() {
    this.setState({ messages: [] });
    if (!this.state.targetUser.password) {
      delete this.state.targetUser.password;
    }
    if (this.validiteTargetUser("edit")) {
      axios
        .patch(
          this.state.url + "/" + this.state.targetUser.id,
          this.state.targetUser,
          {
            headers: {
              "email": window.btoa(this.state.email),
              "password": window.btoa(this.state.password)
            }
          }
        ).then(() => {
          this.getUserList();
          this.setState({ editModal: false });
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
            this.setState({ messages: ["Error"] });
          } else {
            this.setState({ messages: ["Error"] });
            console.log(error);
          }
        });
    } else {
      // this.setState({ messages: [...this.state.messages, "入力情報が正しくありません"] });
    }
  }

  deleteUser() {
    axios
      .delete(
        this.state.url + "/" + this.state.targetUser.id,
        {
          headers: {
            "email": window.btoa(this.state.email),
            "password": window.btoa(this.state.password)
          }
        }
      ).then(() => {
        this.getUserList();
        this.setState({ deleteModal: false });
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

  displayAdmin(is_admin) {
    if (is_admin) return "Admin";
    else return "Normal";
  }

  validiteTargetUser(method) {
    var valid = true;
    var messages = [];
    if (method !== "post"){
      if (!this.state.targetUser.id || this.state.targetUser.id === 0) {
        messages = [...messages, "Validation: ID is invaild."];
        valid = false;
      }
    }
    if (method === "post"){
      if (!this.state.targetUser.name) {
        messages = [...messages, "Validation: Name is invaild."];
        valid = false;
      }
      if (this.state.targetUser.is_admin == null) {
        messages = [...messages, "Validation: User Type is invalid."];
        valid = false;
      }
      if (!this.state.targetUser.email) {
        valid = false;
        messages = [...messages, "Validation: Email is invalid."];
      }
      if (!this.state.targetUser.password) {
        valid = false;
        messages = [...messages, "Validation: Password is invalid."];
      // TODO: 確認用PW実装（POST）
      // } elif (this.state.targetUser.password !== this.state.targetUser.password2){
      //   valid = false;
      //   messages = [...messages, "Validation: Password is not same with Password Confirmation."];
      }
    // } elif (method === "patch") { //TODO: 確認用PW実装（PATCH）
      // PW confirmation for patch
    }
    this.setState({ messages: messages });
    if (valid) return true;
    return false;
  }

  handleChangeName(event) {
    var newTargetUser = { ...this.state.targetUser };
    newTargetUser.name = event.target.value;
    this.setState({ targetUser: newTargetUser });
  }

  handleChangeEmail(event) {
    var newTargetUser = { ...this.state.targetUser };
    newTargetUser.email = event.target.value;
    this.setState({ targetUser: newTargetUser });
  }

  handleChangeIsAdmin(event) {
    var newTargetUser = { ...this.state.targetUser };
    newTargetUser.is_admin = event.target.value;
    this.setState({ targetUser: newTargetUser });
  }

  handleChangePassword(event) {
    var newTargetUser = { ...this.state.targetUser };
    newTargetUser.password = event.target.value;
    this.setState({ targetUser: newTargetUser });
  }

  unlock() {
    var newTargetUser = { ...this.filterUserById(
      this.state.activeTab
    ) };
    newTargetUser.fails_count = 0;
    this.setState({ targetUser: newTargetUser });
    setTimeout(() => {
      this.editUser();
    }, 500);
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
                      <CListGroupItem
                        onClick={() =>
                          this.setState({
                            activeTab: -1,
                            messages: [],
                            targetUser: this.state.blankUser,
                            createModal: !this.state.createModal,
                          })
                        }
                        active={this.state.activeTab === -1}
                      >
                        + ユーザを追加
                      </CListGroupItem>
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
                            <p>
                              UserType: {this.displayAdmin(userInfo.is_admin)}
                            </p>
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
                            <CButton
                              color="light"
                              onClick={() => {
                                this.unlock()
                              }}
                              className="mr-1"
                              style={userInfo.fails_count>=3 ? {} : {display: 'none'}}
                            >
                              Unlock
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
                  type="email"
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
                  type="password"
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
        <CModal
          show={this.state.createModal}
          onClose={() => this.setState({ createModal: !this.state.createModal })}
          color="primary"
        >
          <CModalHeader closeButton>
            <CModalTitle>ユーザ新規作成</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>新しいユーザを追加します。</p>
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
                  type="email"
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
                  required
                  type="password"
                  id="password"
                  value={this.state.targetUser.password}
                  onChange={this.handleChangePassword.bind(this)}
                />
              </CFormGroup>
            </CForm>
            <ErrorMessage message={[this.state.messages]} />
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.createUser()}>
              Create User
            </CButton>{" "}
            <CButton
              color="dark"
              onClick={() =>
                this.setState({ createModal: !this.state.createModal })
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
