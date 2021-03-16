import Main from './Main';
import SignInForm from './pages/auth/SignInForm';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        v.1.2.5
        <div className = "footer">
          <h1 className = "border">THE GOOD TOURIST</h1>
        </div>
        <Switch>
          <Route path='/auth' component={Main} />
          <Route path='/signIn' component={SignInForm} />
          <Route render={() => (<Redirect exact to="/auth" />)} />
        </Switch>
        <NotificationContainer />
      </Router>
    </div>
  );
}

export default App;
