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
import NewAdmin from './pages/admin/NewAdmin';
import Statistic from './pages/stat/CommonStatistic';
import './Main.css';


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

  if (answer) {
    return "on";
  }
  return "off";
}

function Main() {
  let match = useRouteMatch();
  const history = useHistory();
  const cookies = new Cookies();

  const routeChange = () => {
    const cookies = new Cookies();
    cookies.set('token', ' ', { path: '/', maxAge: 0 });
    let path = `/signIn`;
    history.push(path);
  }

  if (!cookies.get('token')) {
    return <Redirect to="/signIn" />
  }
  let user = parseJwt(cookies.get('token'));
  let pr;
  if (user.roles === "USER") {
    pr = ", консультант"
  }
  if (user.roles === "ADMIN") {
    pr = ", адміністратор"
  }
  if (user.roles === "MAIN_ADMIN") {
    pr = ", головний адміністратор"
  }
  return (
    <div>
      <div className="userInfo">
        Авторизований користувач: <span className="userInfo">{user.sub}</span>{pr} відділення №:<span className="userInfo">{user.departmentId}</span>
      </div>
      <button className="logOut" onClick={routeChange}>Вийти з системи</button>
      <Link className={visiblecolorPick(user, "brand")} to={`${match.url}/brands`}> Бренди </Link>
      <Link className={visiblecolorPick(user, "type")} to={`${match.url}/types`}> Типи </Link>
      <Link className={visiblecolorPick(user, "item")} to={`${match.url}/items`}> Спорядження відділенння </Link>
      <Link className={visiblecolorPick(user, "customer")} to={`${match.url}/customers`}> Список клієнтів </Link>
      <Link className={visiblecolorPick(user, "order")} to={`${match.url}/orders`}> Список замовлень </Link>
      <Link className={visiblecolorPick(user, "user")} to={`${match.url}/users`}> Список консультантів </Link>
      <Link className={visiblecolorPick(user, "department")} to={`${match.url}/departments`}> Список відділень </Link>
      <Link className={visiblecolorPick(user, "admin")} to={`${match.url}/admins`}> Список адміністраторів </Link>
      <Link className={visiblecolorPick(user, "stat")} to={`${match.url}/stat`}> Збір статистики </Link>
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
        {user.roles === "MAIN_ADMIN" && (<Route path={`${match.url}/stat`} component={Statistic} />)}
      </Switch>
    </div>
  );
} export default Main;
