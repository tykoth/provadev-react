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
      <TextField source="title" />
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
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
);

export const DebtCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Create>
);

export const DebtShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="teaser" />
      <RichTextField source="body" />
      <DateField label="Publication date" source="created_at" />
    </SimpleShowLayout>
  </Show>
);
