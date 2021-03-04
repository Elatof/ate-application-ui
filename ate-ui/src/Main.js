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
import Customers from './pages/customer/Customers';
import NewCustomer from './pages/customer/NewCustomer';
import UpdateCustomer from "./pages/customer/UpdateCustomer";
import Orders from './pages/item-order/Orders';
import OrderDertails from './pages/item-order/OrderDetails';
import NewOrder from './pages/item-order/NewOrder';
import UpdateOrder from './pages/item-order/UpdateOrder';
import Users from './pages/user/Users';
import NewUser from './pages/user/NewUser';
import Departments from './pages/department/Departments';
import Admins from './pages/admin/Admins';
import NewAdmin from './pages/user/NewUser';


function parseJwt(token) {
  const base64 = token.split('.')[1];
  return JSON.parse(window.atob(base64));
}

function visibleLink(user, name) {
  let userAccess = ["brand", "type", "item", "customer", "order"]
  let adminAccess = ["user", "department"]
  let mainAdminAccess = ["admin", "stat"]

  let answer = false;
  if (user.roles === "USER") {
    userAccess.forEach(element => {
      if (element === name) { answer = true; }
    });
  } else if (user.roles === "ADMIN") {
    adminAccess.forEach(element => {
      if (element === name) { answer = true; }
    });
  } else if (user.roles === "MAIN_ADMIN") {
    mainAdminAccess.forEach(element => {
      if (element === name) { answer = true; }
    });
  }
  return answer;
}

function visiblecolorPick(user, name) {
  let answer = visibleLink(user, name);

  if (answer){
    return "black";
  } 
  return "grey";
}

function visiblepointPick(user, name) {
  let answer = visibleLink(user, name);

  if (answer){
    return "auto";
  } 
  return "none";
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
      <Link to={`${match.url}/brands`} style={{ pointerEvents: visiblepointPick(user, "brand"), color: visiblecolorPick(user, "brand") }}> Бренди </Link> |
      <Link to={`${match.url}/types`} style={{ pointerEvents: visiblepointPick(user, "type"), color: visiblecolorPick(user, "type") }}> Типи </Link> |
      <Link to={`${match.url}/items`} style={{ pointerEvents: visiblepointPick(user, "item"), color: visiblecolorPick(user, "item") }}> Спорядження відділенння </Link> |
      <Link to={`${match.url}/customers`} style={{ pointerEvents: visiblepointPick(user, "customer"), color: visiblecolorPick(user, "customer") }}> Список клієнтів </Link> |
      <Link to={`${match.url}/orders`} style={{ pointerEvents: visiblepointPick(user, "order"), color: visiblecolorPick(user, "order") }}> Список замовлень </Link> |
      <Link to={`${match.url}/users`} style={{ pointerEvents: visiblepointPick(user, "user"), color: visiblecolorPick(user, "user") }}> Список консультантів </Link> |
      <Link to={`${match.url}/departments`} style={{ pointerEvents: visiblepointPick(user, "department"), color: visiblecolorPick(user, "department") }}> Список відділень </Link> |
      <Link to={`${match.url}/admins`} style={{ pointerEvents: visiblepointPick(user, "admin"), color: visiblecolorPick(user, "admin") }}> Список адміністраторів </Link> | 
      <Switch>
        {user.roles === "USER" && (<Route path={`${match.url}/brands`} component={Brands} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/brands-create`} component={NewBrand} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/types`} component={Types} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/types-create`} component={NewType} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/items`} component={Items} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/items-details/:Id`} component={ItemDetails} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/items-create`} component={NewItem} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/items-update/:Id`} component={UpdateItem} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/customers`} component={Customers} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/customers-create`} component={NewCustomer} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/customers-update/:Id`} component={UpdateCustomer} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/orders`} component={Orders} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/orders-details/:Id`} component={OrderDertails} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/orders-create`} component={NewOrder} />)}
        {user.roles === "USER" && (<Route path={`${match.url}/orders-update/:Id`} component={UpdateOrder} />)}
        {user.roles === "ADMIN" && (<Route path={`${match.url}/users`} component={Users} />)}
        {user.roles === "ADMIN" && (<Route path={`${match.url}/users-create`} component={NewUser} />)}
        {user.roles === "ADMIN" && (<Route path={`${match.url}/departments`} component={Departments} />)}
        {user.roles === "MAIN_ADMIN" && (<Route path={`${match.url}/admins`} component={Admins} />)}
        {user.roles === "MAIN_ADMIN" && (<Route path={`${match.url}/admins-create`} component={NewAdmin} />)}
      </Switch>
    </div>
  );
} export default Main;
