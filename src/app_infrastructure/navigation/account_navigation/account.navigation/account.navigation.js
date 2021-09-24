import React from "react";
import { AccountScreen } from "../account.screens/main.screen";
import { LoginScreen } from "../account.screens/login.screen";
import { RegisterScreen } from "../account.screens/signup.screen";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen name="Main" component={AccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);