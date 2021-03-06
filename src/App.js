import * as React from "react";
import DebtIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { DebtList, DebtEdit, DebtCreate, DebtShow } from "./debts";
import { UserList } from "./users";
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";

const App = () => (
  <Admin
    dataProvider={jsonServerProvider("https://jsonplaceholder.typicode.com")}
    authProvider={authProvider}
    dashboard={Dashboard}
  >
    <Resource
      name="Debts"
      icon={DebtIcon}
      list={DebtList}
      edit={DebtEdit}
      create={DebtCreate}
      show={DebtShow}
    />
    <Resource name="users" icon={UserIcon} list={UserList} />
    <Resource name="comments" list={ListGuesser} />
  </Admin>
);
export default App;
