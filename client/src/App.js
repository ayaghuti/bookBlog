import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppNavbar from './components/navbar/AppNavbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreatePost from './components/posts/CreatePost';
import UpdatePost from './components/posts/UpdatePost';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() { 
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Switch>
              <Route exact path="/"  component={Dashboard} />
              <Route path="/signin"  component={SignIn} />
              <Route path="/signup"  component={SignUp} />
              <Route path="/create"  component={CreatePost} />
              <Route path="/update"  component={UpdatePost} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
 
export default App;
