import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import {
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title,
} from "./components/app.styles";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Text } from "../../../../app_components/typography/text.component";
import { SafeArea } from '../../../../app_utils/safe-area.component'
import { Spacer } from "../../../../app_components/spacer/spacer.component";
import { AuthenticationContext } from "../../../../app_services/authentication.service/authentication.context";


export const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [emcContact, setEmcContact] = useState("");
    const [emcContactNumber, setEmcContactNumber] = useState("");
    const [medCon, setMedCon] = useState("");
    const { onRegister, error, setError, isLoading } = useContext(AuthenticationContext);
    return (
        <SafeArea>
            <ImageBackground
                source={require('../../../../../assets/emcy.png')}
                style={styles.containerOver}>
                <View style={styles.container}>
                    <Title>LAESNA</Title>
                    <Spacer size="large" />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Spacer size="large">
                            <AuthInput
                                label="Full Name"
                                value={name}
                                autoCapitalize="words"
                                onChangeText={(u) => setName(u)}
                            />
                        </Spacer>
                        <Spacer size="large">
                            <AuthInput
                                label="Age"
                                value={age}
                                keyboardType="numeric"
                                onChangeText={(u) => setAge(u)}
                            />
                        </Spacer>
                        <Spacer size="large">
                            <AuthInput
                                label="E-mail"
                                value={email}
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={(u) => setEmail(u)}
                            />
                        </Spacer>
                        <Spacer size="large">
                            <AuthInput
                                label="Emergency Contact Name"
                                value={emcContact}
                                autoCapitalize="words"
                                onChangeText={(u) => setEmcContact(u)}
                            />
                        </Spacer>
                        <Spacer size="large">
                            <AuthInput
                                label="Emergency Contact Number"
                                value={emcContactNumber}
                                keyboardType="number-pad"
                                onChangeText={(u) => setEmcContactNumber(u)}
                            />
                        </Spacer>
                        <Spacer size="large">
                            <AuthInput
                                label="Medical Condition"
                                value={medCon}
                                autoCapitalize="words"
                                onChangeText={(u) => setMedCon(u)}
                            />
                        </Spacer>
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
                        <Spacer size="large">
                            <AuthInput
                                label="Repeat Password"
                                value={repeatedPassword}
                                textContentType="password"
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={(p) => setRepeatedPassword(p)}
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
                                    icon="email"
                                    mode="contained"
                                    onPress={() => {
                                        if (name && emcContact && emcContactNumber && age && medCon) {
                                            onRegister(email, password, repeatedPassword, name, emcContact, emcContactNumber, age, medCon)
                                        }
                                        else {
                                            setError('Error: Please complete the form')
                                        }
                                    }}
                                >
                                    Register
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
                        <Spacer size="large" />
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeArea>
    );
};
const styles = StyleSheet.create({
    containerOver: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
})