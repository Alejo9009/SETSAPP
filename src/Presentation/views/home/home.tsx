import React from 'react';
import { View, Text, StyleSheet, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import useViewModel from './viewModel';
import { CustomTextInput } from '../../components/CusatomTextInput';
import styles from './Styles';

export const HomeScreen = () => {
    const { Usuario, Clave, onChange } = useViewModel();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
                <Text style={styles.formTitle}  >INICIAR SESIÓN</Text>

                <CustomTextInput
                    image={require('../../../../assets/email.png')}
                    placeholder='Usuario'
                    keyboardType='default'
                    property='Usuario'
                    onChangeText={onChange}
                    value={Usuario}
                />

                <CustomTextInput
                    image={require('../../../../assets/seguro.png')}
                    placeholder='Contraseña'
                    keyboardType='default'
                    property='Clave'
                    onChangeText={onChange}
                    value={Clave}
                    secureTextEntry={true}
                />

                <View style={styles.buttonContainer}>
                    <RoundedButton
                        text='ENTRAR'
                        onPress={() => {
                            console.log('Usuario:', Usuario);
                            console.log('Contraseña:', Clave);
                            ToastAndroid.show('Iniciando sesión...', ToastAndroid.SHORT);
                        }}
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