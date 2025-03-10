import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, ToastAndroid }
    from 'react-native';
export default function App() {
    return (
        <View style={styles.container}>
            <Image
                source={require('./assets/img/A.jpg')}
                style={styles.imageBackground}
            />
            <View style={styles.logoContainer}>
                <Image
                    source={require('./assets/img/c.png')}
                    style={styles.logoImage}
                />

                <Text style={styles.logoText}>SETS APP</Text>
            </View>
            <View style={styles.form}>
            <Text style={[styles.formText, { textAlign: "center" }]}>INICIAR SESIÓN</Text>


                <View style={styles.formInput}>
                    <Image style={styles.formIcon}
                        source={require('./assets/email.png')}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                    />
                </View>
                <View style={styles.formInput}>
                    <Image style={styles.formIcon}
                        source={require('./assets/seguro.png')}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Contraseña'
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                </View>
                <View style={{ marginTop: 30 }}>
                    <Button
                        title='ENTRAR'
                        onPress={() => ToastAndroid.show('CLICK', ToastAndroid.LONG)}
                        color={'green'}
                    />
                </View>
                <View style={styles.formRegister}>
                    <Text>¿No tienes cuenta?</Text>
                    <View>
  <Text style={styles.formRegisterText}>Regístrate</Text>
  <Text style={[styles.formRegisterText, { marginTop: 14 }]}>Recuperar Contraseña</Text>
</View>

                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%',
    },
    form: {
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    formIcon: {
        width: 28,
        height: 28,
        marginTop: 5,
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30,
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15,
    },
    formRegister: {
        flexDirection: 'row',

        justifyContent: 'center',
        marginTop: 30,
    },
    formRegisterText: {
        fontStyle: 'normal',
        color: 'green',
        borderBottomWidth: 1,
        borderBottomColor: 'green',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '10%',
    },
    logoImage: {
        width: 110,
        height: 110,
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },
});