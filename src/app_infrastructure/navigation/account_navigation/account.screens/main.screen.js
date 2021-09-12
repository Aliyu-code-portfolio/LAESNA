import React from 'react'
import { View, ImageBackground } from 'react-native';
import {
    AuthButton,
    Title,
} from "./components/app.styles";
import { Spacer } from "../../../../app_components/spacer/spacer.component";

export const AccountScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../../../../../assets/emcy.png')}
            style={{
                flex: 1,
                height: '100%',
                width: '100%'
            }}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Title>LAESNA Emergency System</Title>
                <Spacer size="large" />
                <View style={{ paddingTop: 20, paddingBottom: 10, }}>
                    <AuthButton
                        icon="email"

                        mode="contained"
                        onPress={() => navigation.navigate("Register")}
                    >
                        Register
          </AuthButton>
                </View>
                <View style={{ paddingBottom: 10, }} />
                <AuthButton
                    icon="lock-open-outline"
                    mode="contained"
                    onPress={() => navigation.navigate("Login")}
                >
                    Login
        </AuthButton>
            </View>
        </ImageBackground>
    );
};