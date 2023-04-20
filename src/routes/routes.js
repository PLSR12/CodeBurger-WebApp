import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import paths from "../constants/paths";
import {
  Admin,
  Cart,
  Home,
  Login,
  Products,
  Register,
  User,
} from "../containers";
import PrivateRoute from "../routes/private-routes";

function AppRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cadastro" component={Register} />
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/produtos" component={Products} />
        <PrivateRoute exact path="/carrinho" component={Cart} />
        <PrivateRoute exact path="/usuario" component={User} />

        <PrivateRoute exact path={paths.Order} component={Admin} />
        <PrivateRoute exact path={paths.Products} component={Admin} />
        <PrivateRoute exact path={paths.NewProduct} component={Admin} />
        <PrivateRoute exact path={paths.EditProduct} component={Admin} />
        <PrivateRoute exact path={paths.NewCategorie} component={Admin} />
        <Route exact path={paths.Category} component={Admin} />
      </Switch>
    </Router>
  );
}

export default AppRoutes;
