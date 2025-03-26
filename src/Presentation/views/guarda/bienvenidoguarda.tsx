import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Animated,  } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import { useNavigation } from "@react-navigation/native";


export const Guardabienvenido: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [fadeAnim] = useState(new Animated.Value(0));


    useEffect(() => {
        Animated.timing(
            fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }
        ).start();


        const timer = setTimeout(() => {
            navigation.replace('GuardaLoadingScreen');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation, fadeAnim]);


    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image
                source={require('./img/guarda.png')}
                style={styles.logo}
            />

            <Text style={styles.welcomeTitle}>¡Bienvenido Guarda de seguridad!</Text>

            <Text style={styles.welcomeSubtitle}>Tu registro ha sido exitoso</Text>

            <View style={styles.messageBox}>
                <Text style={styles.messageText}>
                    Ahora puedes comenzar a usar todas las funciones  disponibles.
                </Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',

    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 25,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a3e72',
        marginBottom: 10,
    },
    welcomeSubtitle: {
        fontSize: 18,
        color: '#4a6da7',
        marginBottom: 30,
    },
    messageBox: {
        backgroundColor: '#e1ecf7',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    messageText: {
        textAlign: 'center',
        color: '#2c4e7e',
        fontSize: 16,
    },
});