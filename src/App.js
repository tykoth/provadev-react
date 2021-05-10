import * as React from "react";
import DebtIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import { Admin, Resource, ListGuesser } from "react-admin";

import { DebtList, DebtEdit, DebtCreate, DebtShow } from "./debts";
import { UserList } from "./users";
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
  >
    <Resource
      name="debts"
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
