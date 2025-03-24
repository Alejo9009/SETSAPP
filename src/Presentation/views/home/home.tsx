import React, { useState } from 'react';
import { View, Text, Image, ToastAndroid, TouchableOpacity ,  } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { CustomTextInput } from '../../components/CusatomTextInput';
import styles from './Styles';

export const HomeScreen = () => {
    const [user, setUser] = useState({
        Usuario: '',
        Clave: ''
    });

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const onChange = (property: string, value: string) => {
        setUser({...user, [property]: value});
    }

    const handleLogin = async () => {
        if (user.Usuario === '' || user.Clave === '') {
            ToastAndroid.show('Usuario y contraseña son requeridos', ToastAndroid.SHORT);
            return;
        }
    
        try {
            const response = await fetch('http://192.168.1.105:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
    
            // Verificar primero el estado de la respuesta
            const responseText = await response.text();
            let data;
            
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Error parsing JSON:', e, 'Response:', responseText);
                ToastAndroid.show('Error en la respuesta del servidor', ToastAndroid.LONG);
                return;
            }
    
            if (!response.ok) {
                ToastAndroid.show(data.error || 'Error en el inicio de sesión', ToastAndroid.SHORT);
                return;
            }
    
            // Redirección según el rol
            switch(data.user.idRol) {
                case '1111': // Admin
                    navigation.replace('ForgotPasswordScreen');
                    break;
                case '2222': // Guarda de Seguridad
                    navigation.replace('ForgotPasswordScreen');
                    break;
                case '3333': // Residente
                    navigation.replace('ForgotPasswordScreen');
                    break;
                default:
                    navigation.replace('HomeScreen');
            }
            ToastAndroid.show('Inicio de sesión exitoso', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error en inicio de sesión:', error);
            
            // Manejo seguro del mensaje de error
            let errorMessage = 'Error de conexión';
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            } else if (error && typeof error === 'object' && 'message' in error) {
                
            }
            
            ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        }
    };
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/img/A.jpg')}
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../assets/img/c.png')}
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>SETS APP</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.formTitle}>INICIAR SESIÓN</Text>

                <CustomTextInput
                    image={require('../../../../assets/email.png')}
                    placeholder='Usuario'
                    keyboardType='default'
                    property='Usuario'
                    onChangeText={onChange}
                    value={user.Usuario}
                />

                <CustomTextInput
                    image={require('../../../../assets/seguro.png')}
                    placeholder='Contraseña'
                    keyboardType='default'
                    property='Clave'
                    onChangeText={onChange}
                    value={user.Clave}
                    secureTextEntry={true}
                />

                <View style={styles.buttonContainer}>
                    <RoundedButton
                        text='ENTRAR'
                        onPress={handleLogin}
                    />
                </View>

                <View style={styles.formFooter}>
                    <Text style={styles.footerText}>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.footerLink}>Regístrarse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')} style={{ marginTop: 10 }}>
                        <Text style={styles.footerLink}>Recuperar Contraseña</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};