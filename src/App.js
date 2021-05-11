import * as React from "react";
import DebtIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { DebtList, DebtEdit, DebtCreate, DebtShow } from "./debts";
import { UserList } from "./users";
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";

const App = () => (
  <Admin
    dataProvider={dataProvider("https://jsonplaceholder.typicode.com")}
    authProvider={authProvider}
    dashboard={Dashboard}
  >
    <Resource
      name="dividas"
      icon={DebtIcon}
      list={DebtList}
      edit={DebtEdit}
      create={DebtCreate}
      show={DebtShow}
    />
    <Resource label="Usuarios" name="users" icon={UserIcon} list={UserList} />
  </Admin>
);
export default App;
