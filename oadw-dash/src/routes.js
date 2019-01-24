import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import DefaultLayout from "./layouts/Default";

// Route Views
import Overview from "./views/Overview";
import Consul from "./views/Consul";
import Collab from "./views/Collab";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/overview" />
  },
  {
    path: "/overview",
    layout: DefaultLayout,
    component: Overview
  },
  {
    path: "/consul",
    layout: DefaultLayout,
    component: Consul
  },
  {
    path: "/collab",
    layout: DefaultLayout,
    component: Collab
  }
];