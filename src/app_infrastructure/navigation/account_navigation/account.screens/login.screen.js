import React, { useState, useContext } from "react";
import { View, ImageBackground } from 'react-native';
import {
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title,
} from "./components/app.styles";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Text } from "../../../../app_components/typography/text.component";
import { Spacer } from "../../../../app_components/spacer/spacer.component";
import { AuthenticationContext } from "../../../../app_services/authentication.service/authentication.context";

export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, onLogin, error } = useContext(AuthenticationContext);
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
                <Title>LAESNA</Title>
                <Spacer size="large" />
                <AuthInput
                    label="E-mail"
                    value={email}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(u) => setEmail(u)}
                />
                <Spacer size="large">
                    <AuthInput
                        label="Password"
                        value={password}
                        textContentType="password"
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={(p) => setPassword(p)}
                    />
                </Spacer>
                {error && (
                    <ErrorContainer size="large">
                        <Text variant="error">{error}</Text>
                    </ErrorContainer>
                )}
                <Spacer size="large">
                    {!isLoading ? (
                        <AuthButton
                            icon="lock-open-outline"
                            mode="contained"
                            onPress={() => onLogin(email, password)}
                        >
                            Login
                        </AuthButton>
                    ) : (
                        <ActivityIndicator animating={true} color={Colors.blue300} />
                    )}
                </Spacer>
                <Spacer size="large">
                    <AuthButton mode="contained" onPress={() => navigation.goBack()}>
                        Back
        </AuthButton>
                </Spacer>
            </View>
        </ImageBackground>
    );
};