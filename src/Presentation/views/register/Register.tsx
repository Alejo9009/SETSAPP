import React from 'react'
import { Picker } from '@react-native-picker/picker';

import {
    View, Text, StyleSheet, Image, TextInput, ToastAndroid, Touchable, ScrollView,
    TouchableOpacity
} from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomTextInput } from '../../components/CusatomTextInput';
import styles from './Styles'

export const RegisterScreen = () => {
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
                <Text style={styles.formTitle}>REGISTRARSE</Text>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/recursos-humanos.png')} />
                        <Picker
                            style={styles.formTextInput}
                            placeholder='Rol'
                        >
                            <Picker.Item label="Admin" value="1" />
                            <Picker.Item label="Guarda de Seguridad" value="2" />
                            <Picker.Item label="Residente" value="3" />
                        </Picker>
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Primer Nombre'
                            keyboardType='default'
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Segundo Nombre'
                            keyboardType='default'
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Primer Apellido'
                            keyboardType='default'
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Segundo Apellido'
                            keyboardType='default'
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/email.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Correo Electrónico'
                            keyboardType='email-address'
                        />
                    </View>

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <Picker
                            style={styles.formTextInput}
                            placeholder='Tipo de Documento'
                        >
                            <Picker.Item label="Cedula de Ciudadanía" value="1" />
                            <Picker.Item label="Cédula de ciudadanía digital" value="2" />
                            <Picker.Item label=" Cédulas de Extranjería" value="3" />

                        </Picker>
                    </View>
                   

                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Número de Documento'
                            keyboardType='numeric'
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/apartamento.png')} />
                        <Picker
                            style={styles.formTextInput}
                            placeholder='Tipo de Propietario'
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
                            placeholder='Apartamento'
                            keyboardType='default'
                        />
                    </View>



                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/llamada-telefonica.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Teléfono 1'
                            keyboardType='numeric'
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/llamada-telefonica.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Teléfono 2 (Opcional)'
                            keyboardType='numeric'
                        />
                    </View>







                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/nuevo.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Usuario'
                            keyboardType='default'
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/ddd.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Contraseña'
                            keyboardType='default'
                            secureTextEntry={true}
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon} source={require('../../../../assets/ddd.png')} />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Confirmar Contraseña'
                            keyboardType='default'
                            secureTextEntry={true}
                        />
                    </View>

                    {/* Botón de Confirmar */}
                    <View style={styles.buttonContainer}>
                        <RoundedButton
                            text='CONFIRMAR'
                            onPress={() => console.log('Registro exitoso!')}
                        />
                    </View>

                    <View style={styles.formFooter}>
                        <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <Text style={styles.footerLink}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 10 }}>
                            <Text  onPress={() => navigation.navigate('ForgotPasswordScreen')} style={styles.footerLink}>Recuperar Contraseña</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView >
            </View>
            </View>
 )};
