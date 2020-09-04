import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: this.props.location.state.email,
          password: this.props.location.state.password,
        };
      }

    componentDidMount() {
        this.clearUser()
    }

    clearUser() {
        this.setState({
            email: '',
            password: '',
        });
    }

    render() {
        return (
          <div>
            <h2><b>ログアウトしました</b></h2>
            <br></br>
            <p>{this.state.email}ご利用ありがとうございました。</p>
            <Link to="/login">ログイン画面</Link>
          </div>
        );
      }
    }
export default Logout;