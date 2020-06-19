import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AuthService from "./services/auth.service";
import Home from "./cmp/Home";
import Profile from "./cmp/profile";
import Register from "./cmp/register";
import Login from "./cmp/login";

import AdminLogin from "./cmp/admin/login";
import AdminDashboard from "./cmp/admin/dashboard";
// import AdminUserIndex from "./cmp/admin/user/index";
import AdminUserList from "./cmp/admin/user/list";
// import AdminAdminList from "./cmp/admin/admin/list";
import AdminExamIndex from "./cmp/admin/exam/index";
import AdminExamList from "./cmp/admin/exam/list";
import AdminExamAdd from "./cmp/admin/exam/add";
import AdminExamView from "./cmp/admin/exam/view";
import AdminExamEdit from "./cmp/admin/exam/edit";
import AdminQuestionIndex from "./cmp/admin/question/index";
import AdminQuestionList from "./cmp/admin/question/list";
import AdminQuestionAdd from "./cmp/admin/question/add";
import AdminQuestionView from "./cmp/admin/question/view";
import AdminQuestionEdit from "./cmp/admin/question/edit";
import AdminMarkView from "./cmp/admin/result/list";

import UserDashboard from "./cmp/user/dashboard";
import UserExamList from "./cmp/user/exam/list";
import UserExamTry from "./cmp/user/exam/try";
import UserExamResult from "./cmp/user/exam/result";
import Forgetpassword from "./cmp/Forgetpassword";
import Resetpassword from "./cmp/Resetpassword"
import Protected from "./cmp/Protected"
import Error from "./cmp/Error";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(user)

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showUserBoard: user.roles.includes("ROLE_USER"),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard, showUserBoard } = this.state;

    return (
      <Router>
        <div className="Text">
          <nav className="navbar navbar-expand navbar-dark bg-dark">

            {/* <a href="Dashboard" className="navbar-brand mr-3">Awan Quiz Program</a> */}

            {showAdminBoard && (

              <a className="navbar-brand mr-3"><span className="username"><span>A</span><span>w</span><span>a</span><span>n</span> &nbsp;<span>Q</span><span>u</span><span>i</span><span>z</span></span></a>


            )}
              &nbsp;&nbsp;&nbsp;

            {showUserBoard && (
              <a className="navbar-brand mr-3"><span className="username"><span>A</span><span>w</span><span>a</span><span>n</span> &nbsp;<span>Q</span><span>u</span><span>i</span><span>z</span></span></a>
            )}


            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link style={{ color: "yellow" }} title="Home" to={"/home"} className="nav-link active">
                  <i style={{ color: "yellow" }} className="fa fa-home"></i>  Home
                </Link>
              </li>
              &nbsp;&nbsp;&nbsp;


              {showAdminBoard && (
                <li className="nav-item">
                  <Link style={{ color: "yellow" }} title="Dashboard" to={"/admin/dashboard"} className="nav-link active">
                    <i style={{ color: "yellow" }} className="fa fa-dashboard"></i> Dashboard
                  </Link>
                </li>
              )}
              &nbsp;&nbsp;&nbsp;


              {showUserBoard && (
                <li className="nav-item">
                  <Link style={{ color: "yellow" }} title="Dashboard" to={"/dashboard/index"} className="nav-link active">
                    <i style={{ color: "yellow" }} className="fa fa-dashboard"></i> Dashboard
                  </Link>
                </li>
              )}
              &nbsp;&nbsp;&nbsp;
{/* 
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link active">
                    User <i className="fa fa-user" aria-hidden="true"></i>

                  </Link>
                </li>
              )} */}

            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link style={{ color: "yellow" }} title={currentUser.username} to={"/profile"} className="nav-link active">
                    <i class="fa fa-user-circle" aria-hidden="true"></i> Hi, {currentUser.username}
                  </Link>
                </li>
                &nbsp;&nbsp;&nbsp;
                <li className="nav-item">
                  <a style={{ color: "yellow" }} href="/user/login" title="LogOut" className="nav-link active" onClick={this.logOut}>
                    LogOut <i style={{ color: "yellow" }} className="fa fa-sign-out" aria-hidden="true"></i>

                  </a>
                </li>
              </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link style={{ color: "yellow" }} title="User Login" to={"/user/login"} className="nav-link active">
                      User Login <i style={{ color: "yellow" }} className="fa fa-sign-in" aria-hidden="true"></i>

                    </Link>
                  </li>
                &nbsp;&nbsp;&nbsp;

                  <li className="nav-item">
                    <Link style={{ color: "yellow" }} title="Admin Login" to={"/admin/login"} className="nav-link active">
                      Admin Login <i style={{ color: "yellow" }} className="fa fa-user-circle-o" aria-hidden="true"></i>

                    </Link>
                  </li>
                </div>
              )}
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />

              <Route exact path="/admin/login" component={AdminLogin} />
              <Protected exact path="/admin/user/list" component={AdminUserList} />
              <Protected exact path="/admin/dashboard" component={AdminDashboard} />
              <Protected exact path={["/admin/exam", "/admin/exam/index"]} component={AdminExamIndex} />
              <Protected exact path="/admin/exam/list" component={AdminExamList} />
              <Protected exact path="/admin/exam/add" component={AdminExamAdd} />
              <Protected exact path='/admin/exam/view/' component={AdminExamView} />
              <Protected exact path='/admin/exam/edit/:id' component={AdminExamEdit} />
              <Protected exact path={["/admin/question", "/admin/question/index"]} component={AdminQuestionIndex} />
              <Protected exact path="/admin/question/list" component={AdminQuestionList} />
              <Protected exact path="/admin/question/add" component={AdminQuestionAdd} />
              <Protected exact path="/admin/question/view" component={AdminQuestionView} />
              <Protected exact path='/admin/question/edit/:id' component={AdminQuestionEdit} />
              <Protected exact path='/admin/result/list' component={AdminMarkView} />


              <Route exact path="/user/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Protected exact path="/profile" component={Profile} />
              <Route exact path="/dashboard/index" component={UserDashboard} />
              <Protected exact path="/exam/list" component={UserExamList} />
              <Protected exact path="/exam/try" component={UserExamTry} />
              <Protected exact path="/result/list" component={UserExamResult} />
              <Route exact path="/user/forget_password" component={Forgetpassword} />
              <Route exact path="/user/reset_password/" component={Resetpassword} />
              <Protected exact path="*" component={Error} />


            </Switch>

          </div>

        </div>
      </Router>
    );
  }
}

export default App;