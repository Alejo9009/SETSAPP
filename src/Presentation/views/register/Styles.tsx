import { StyleSheet } from "react-native";

const RegisterStyles = StyleSheet.create({

  
        container: {
            flex: 1,
            backgroundColor: 'black',
        },
        imageBackground: {
            width: '110%',
            height: '100%',
            opacity: 0.7,
            bottom: '30%',
        },
        form: {
            width: '100%',
            height: '70%',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 30,
        },
    
        formText: {
            fontWeight: 'bold',
            fontSize: 16,
        },
        formIcon: {
            width: 25,
            height: 25,
            marginTop: 5,
        },
        formInput: {
            flexDirection: 'row',
            marginTop: 25,
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
     
        logoContainer: {
            position: 'absolute',
            alignSelf: 'center',
            top: '5%',
            alignItems: 'center',
        },
        logoImage: {
    
            width: 150,
            height: 150,
        },
        logoText: {
            color: 'white',
            textAlign: 'center',
            fontSize: 20,
            marginTop: 10,
            fontWeight: 'bold',
        },
        formRegisterText: {
            fontStyle: 'normal',
            color: 'green',
            borderBottomWidth: 1,
            borderBottomColor: 'green',
            fontWeight: 'bold',
            marginLeft: 10,
        },
        scrollContainer: {
            flexGrow: 1,
            justifyContent: 'center',
        },
    });




export default RegisterStyles;