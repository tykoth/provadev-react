import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

export default () => (
  <Card>
    <CardHeader title="Bem vindo ao teste" />
    <CardContent>
      Boilerplate inspirado no tutorial padrão do react-admin utilizando uma
      versão customizada do ra-data-json-server, onde caso seja o elemento
      "dividas", uma regra substitui o URL e inclui o uuid
    </CardContent>
  </Card>
);
