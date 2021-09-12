import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AccountNavigator } from './account.navigation';
import { AppNavigator } from '../../app_navigation/app.navigation';

import { AuthenticationContext } from "../../../../app_services/authentication.service/authentication.context";

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
        </NavigationContainer>
    );
}