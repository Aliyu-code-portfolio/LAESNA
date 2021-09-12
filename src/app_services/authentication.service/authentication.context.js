import React, { useState, createContext, useContext } from "react";
import { Alert } from 'react-native'
import * as firebase from "firebase";

import { loginRequest } from "./authentication.service";
import { FirebaseContext } from '../firebase.services/firebase'

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { storeUserData } = useContext(FirebaseContext)

    firebase.auth().onAuthStateChanged((usr) => {
        if (usr) {
            setUser(usr);
            setIsLoading(false);
        }
    });

    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(email, password)
            .then((u) => {
                setUser(u);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.toString());
            });
    };
    const onRegister = (email, password, repeatedPassword, name, emcContact, emcContactNumber, age, medCon) => {
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }
        setIsLoading(true)
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((u) => {
                setUser(u);
                //setIsLoading(false);
                const stored = storeUserData(email, name, emcContact, emcContactNumber, age, medCon)
                if (stored) {
                    setError("Error: Sorry, we could not save your data");
                    setIsLoading(false);
                }
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.toString());
            });


    };
    const onLogout = () => {
        Alert.alert(

            "Logout?",
            "Confirm logout",
            [
                {
                    text: "Cancel",
                    //save action to data base
                    style: "cancel"
                },
                {
                    text: "Confirm",
                    //save action to database
                    onPress: () => {
                        firebase
                            .auth()
                            .signOut()
                            .then(() => {
                                setUser(null);
                                setError(null);
                            });
                    }
                }
            ]
        );
    };
    return (
        <AuthenticationContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                error,
                onLogin,
                setError,
                onRegister,
                onLogout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};