import React, { useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CListGroup,
    CListGroupItem,
    CRow,
    CTabContent,
    CTabPane
  } from '@coreui/react';


const UserManagement = () => {

  const listUserInfo=[
    {user_id:0, name:"510", "is_admin": "false", email:"510@symitems.com", "password": "chinchinge"},
    {user_id:1, name:"096", "is_admin": "true", email:"096@symitems.com", "password": "chirichirige"}
  ]
  const [activeTab, setActiveTab] = useState(-1)

  return (
    <div className="UserManagement">
        <h1>ユーザ管理画面</h1>
        <>
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
                        {listUserInfo.map((userInfo) => {
                          return(
                          <CListGroupItem onClick={() => setActiveTab(userInfo.user_id)} action active={activeTab === userInfo.user_id} >{userInfo.name}</CListGroupItem>
                          );
                        })}
                      </CListGroup>
                    </CCol>
                    <CCol xs="8">
                      <CTabContent>
                        {listUserInfo.map((userInfo) => {
                          return(
                          <CTabPane active={activeTab === userInfo.user_id} >
                            <p>ID: {userInfo.user_id}</p>
                            <p>Name: {userInfo.name}</p>
                            <p>E-mail: {userInfo.email}</p>
                            <p>Admin: {userInfo.is_admin}</p>
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
        </>
      </div>
  )
}

export default UserManagement;
