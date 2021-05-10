import * as React from "react";
import {
  Show,
  ShowButton,
  SimpleShowLayout,
  RichTextField,
  DateField,
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  TextField,
  EditButton,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  Filter
} from "react-admin";

const DebtFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const DebtList = (props) => (
  <List {...props} filters={<DebtFilter />}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="User" source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="motivo" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

const DebtTitle = ({ record }) => {
  return <span>Debt {record ? `"${record.title}"` : ""}</span>;
};

export const DebtEdit = (props) => (
  <Edit title={<DebtTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="motivo" />
      <TextInput source="valor" />
    </SimpleForm>
  </Edit>
);

export const DebtCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput
        optionValue="idUsuario"
        label="User"
        source="userId"
        reference="users"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="motivo" />
      <TextInput source="valor" />
    </SimpleForm>
  </Create>
);

export const DebtShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="motivo" />
      <TextField source="valor" />
      <DateField label="Publication date" source="created_at" />
    </SimpleShowLayout>
  </Show>
);
