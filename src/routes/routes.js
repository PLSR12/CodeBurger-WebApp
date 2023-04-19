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
        <Route exact path="/produtos" component={Products} />
        <Route exact path="/carrinho" component={Cart} />
        <Route exact path="/usuario" component={User} />

        <Route exact path={paths.Order} component={Admin} />
        <Route exact path={paths.Products} component={Admin} />
        <Route exact path={paths.NewProduct} component={Admin} />
        <Route exact path={paths.EditProduct} component={Admin} />
        <PrivateRoute exact path={paths.NewCategorie} component={Admin} />
        <Route exact path={paths.Category} component={Admin} />
      </Switch>
    </Router>
  );
}

export default AppRoutes;
