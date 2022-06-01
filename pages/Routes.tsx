import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistroDePonto from './RegistrarPonto';
import Configuracao from "./Configuracao";
import Login from "./Login";

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegistroDePonto" component={RegistroDePonto} />
        <Stack.Screen name="Configuracao" component={Configuracao} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;