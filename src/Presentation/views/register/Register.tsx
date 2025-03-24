import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import {  View, Text, StyleSheet, Image, TextInput, ToastAndroid, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './Styles'
import { MyColors } from '../../theme/AppTheme';

export const RegisterScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    const [user, setUser] = useState({
        idRol: '', 
        PrimerNombre: '',
        SegundoNombre: '',
        PrimerApellido: '',
        SegundoApellido: '',
        Correo: '',
        Id_tipoDocumento: '', 
        numeroDocumento: '',
        telefonoUno: '',
        telefonoDos: '',
        tipo_propietario: '', 
        apartamento: '',
        Usuario: '',
        Clave: '',
        confirmPassword: ''
    });

    const handleChange = (name: string, value: string) => {
        setUser({ ...user, [name]: value });
    };

    const handleRegister = async () => {
        // Validaciones básicas
        if (!user.PrimerNombre || !user.PrimerApellido || !user.Correo || 
            !user.numeroDocumento || !user.telefonoUno || !user.Usuario || 
            !user.Clave || !user.confirmPassword || !user.idRol || 
            !user.Id_tipoDocumento || !user.tipo_propietario || !user.apartamento) {
            Alert.alert('Error', 'Por favor complete todos los campos obligatorios');
            return;
        }
    
        if (user.Clave !== user.confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }
    
        try {
            const response = await fetch('http://192.168.1.105:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...user,
          
                    numeroDocumento: Number(user.numeroDocumento),
                    telefonoUno: Number(user.telefonoUno),
                    telefonoDos: user.telefonoDos ? Number(user.telefonoDos) : null
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Redirección según el rol
                switch(user.idRol) {
                    case '1111': // Admin
                        navigation.replace('HomeScreen');
                        break;
                    case '2222': // Guarda de Seguridad
                        navigation.replace('HomeScreen');
                        break;
                    case '3333': // Residente
                        navigation.replace('HomeScreen');
                        break;
                    default:
                        navigation.replace('HomeScreen');
                }
                ToastAndroid.show('Registro exitoso!', ToastAndroid.LONG);
            } else {
                Alert.alert('Error', data.error || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error en registro:', error);
            Alert.alert('Error', 'No se pudo conectar al servidor');
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
                <Text style={styles.formTitle}>REGISTRARSE</Text>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/recursos-humanos.png')} />
                        <Picker
                            style={styles.formTextInput}
                            selectedValue={user.idRol}
                            onValueChange={(value) => handleChange('idRol', value)}
                        >
                            <Picker.Item label="Admin" value="1111" />
                            <Picker.Item label="Guarda de Seguridad" value="2222" />
                            <Picker.Item label="Residente" value="3333" />
                         
                        </Picker>
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Primer Nombre*'
                            keyboardType='default'
                            value={user.PrimerNombre}
                            onChangeText={(text) => handleChange('PrimerNombre', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Segundo Nombre'
                            keyboardType='default'
                            value={user.SegundoNombre}
                            onChangeText={(text) => handleChange('SegundoNombre', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Primer Apellido*'
                            keyboardType='default'
                            value={user.PrimerApellido}
                            onChangeText={(text) => handleChange('PrimerApellido', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Segundo Apellido'
                            keyboardType='default'
                            value={user.SegundoApellido}
                            onChangeText={(text) => handleChange('SegundoApellido', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/email.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Correo Electrónico*'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            value={user.Correo}
                            onChangeText={(text) => handleChange('Correo', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <Picker
                            style={styles.formTextInput}
                            selectedValue={user.Id_tipoDocumento}
                            onValueChange={(value) => handleChange('Id_tipoDocumento', value)}
                        >
                            <Picker.Item label="Cedula de Ciudadanía" value="1" />
                            <Picker.Item label="Cédula de ciudadanía digital" value="2" />
                            <Picker.Item label="Cédulas de Extranjería" value="4" />
                        </Picker>
                    </View>
                   
                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Número de Documento*'
                            keyboardType='numeric'
                            value={user.numeroDocumento}
                            onChangeText={(text) => handleChange('numeroDocumento', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/apartamento.png')} />
                        <Picker
                            style={styles.formTextInput}
                            selectedValue={user.tipo_propietario}
                            onValueChange={(value) => handleChange('tipo_propietario', value)}
                        >
                            <Picker.Item label="Dueño" value="dueño" />
                            <Picker.Item label="Residente" value="residente" />
                            <Picker.Item label="Ambos" value="ambos" />
                        </Picker>
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/apartamento.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Apartamento*'
                            keyboardType='default'
                            value={user.apartamento}
                            onChangeText={(text) => handleChange('apartamento', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/llamada-telefonica.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Teléfono 1*'
                            keyboardType='numeric'
                            value={user.telefonoUno}
                            onChangeText={(text) => handleChange('telefonoUno', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/llamada-telefonica.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Teléfono 2 (Opcional)'
                            keyboardType='numeric'
                            value={user.telefonoDos}
                            onChangeText={(text) => handleChange('telefonoDos', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Usuario*'
                            keyboardType='default'
                            autoCapitalize='none'
                            value={user.Usuario}
                            onChangeText={(text) => handleChange('Usuario', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/ddd.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Contraseña*'
                            keyboardType='default'
                            secureTextEntry={true}
                            value={user.Clave}
                            onChangeText={(text) => handleChange('Clave', text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/ddd.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Confirmar Contraseña*'
                            keyboardType='default'
                            secureTextEntry={true}
                            value={user.confirmPassword}
                            onChangeText={(text) => handleChange('confirmPassword', text)}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <RoundedButton
                            text='CONFIRMAR'
                            onPress={handleRegister}
                        />
                    </View>

                    <View style={styles.formFooter}>
                        <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <Text style={styles.footerLink}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 10 }}>
                            <Text onPress={() => navigation.navigate('ForgotPasswordScreen')} style={styles.footerLink}>
                                Recuperar Contraseña
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};