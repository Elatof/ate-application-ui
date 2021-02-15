import { useRouteMatch, Link, Route, Switch, Redirect } from 'react-router-dom';
import Brands from './pages/brand/Brands';
import 'react-notifications/lib/notifications.css';
import NewBrand from './pages/brand/NewBrand';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";
import Types from './pages/type/Types';
import NewType from './pages/type/NewType';
import Items from './pages/item/Items';
import ItemDetails from './pages/item/ItemDetails';
import NewItem from './pages/item/NewItem';
import UpdateItem from './pages/item/UpdateItem';


function parseJwt(token) {
  const base64 = token.split('.')[1];
  return JSON.parse(window.atob(base64));
}

function visibleLink(user, name) {
  let userAccess = ["brand", "type", "item"]
  let adminAccess = []
  let mainAdminAccess = []

  let answer = 'hidden';
  if (user.roles === "USER") {
    userAccess.forEach(element => {
      if (element === name) { answer = 'visible'; }
    });
  } else if (user.roles === "ADMIN") {
    adminAccess.forEach(element => {
      if (element === name) { answer = 'visible'; }
    });
  } else if (user.roles === "MAIN_ADMIN") {
    mainAdminAccess.forEach(element => {
      if (element === name) { answer = 'visible'; }
    });
  } 
  return answer;
}

function Main() {
  let match = useRouteMatch();
  const history = useHistory();
  const cookies = new Cookies();

  const routeChange = () => {
    let path = `/signIn`;
    history.push(path);
  }

  if (!cookies.get('token')) {
    return <Redirect to="/signIn" />
  }
  let user = parseJwt(cookies.get('token'));

  return (
    <div>
      {user.sub} Відділення №:{user.departmentId}
      <p></p>
      <button onClick={routeChange}>Вийти з системи</button>
      <p></p>
      <Link to={`${match.url}/brands`} style = {{visibility: visibleLink(user, "brand")}}> Бренди </Link> |
      <Link to={`${match.url}/types`} style = {{visibility: visibleLink(user, "type")}}> Типи </Link> |
      <Link to={`${match.url}/items`} style = {{visibility: visibleLink(user, "item")}}> Спорядження відділенння </Link>
      <Switch>
        {user.roles === "USER" && (<Route path={`${match.url}/brands`} component={Brands} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/brands-create`} component={NewBrand} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/types`} component={Types} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/types-create`} component={NewType} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/items`} component={Items} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/items-details/:Id`} component={ItemDetails} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/items-create`} component={NewItem} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/items-update/:Id`} component={UpdateItem} />)}
      </Switch>
    </div>
  );
} export default Main;
