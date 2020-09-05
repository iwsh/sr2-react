import React, { Component } from 'react'

// ログイン確認用コード

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.data.name,
      email: this.props.location.state.data.email,
      password: this.props.location.state.data.password_digest,
    };
  }

  render() {
    return (
      <div>
        <h2>カレンダー画面</h2>
        <hr/>
        <p>name:<span style={{color:'#ff0000'}}>{this.state.name}</span></p>
        <p>email:<span style={{color:'#ff0000'}}>{this.state.email}</span></p>
        <p>password:<span style={{color:'#ff0000'}}>{this.state.password}</span></p>
      </div>
    );
  }
}

export default Calendar