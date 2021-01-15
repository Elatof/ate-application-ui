import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Brands from './pages/Brands';

function Header() {
  return (
    <Router>
      <div>
        v. 0.2.5
        <h1>Good Tourist</h1>
        <NavLink exact to='/brands'> Brands </NavLink>
        <Switch>
          <Route exact path='/brands' component={Brands} />
        </Switch>
      </div>
    </Router>
  );
} export default Header;
