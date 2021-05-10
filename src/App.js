import * as React from "react";
import DebtIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import { Admin, Resource, ListGuesser } from "react-admin";

import { DebtList, DebtEdit, DebtCreate, DebtShow } from "./debts";
import { UserList } from "./users";
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
// import jsonServerProvider from "./dataProvider";

import jsonServerProvider from "ra-data-json-server";
const App = () => (
  <Admin
    dataProvider={jsonServerProvider("https://jsonplaceholder.typicode.com")}
    authProvider={authProvider}
    dashboard={Dashboard}
  >
    <Resource name="users" icon={UserIcon} list={UserList} />
  </Admin>
);
export default App;
