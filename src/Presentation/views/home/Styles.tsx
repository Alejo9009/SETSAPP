import { StyleSheet } from "react-native";



const HomeStyles = StyleSheet.create({
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
        color: 'darkgreen',
        textAlign: 'center',
        fontSize: 26,
        marginTop: 10,
        fontWeight: '700',
        backgroundColor: 'white',
    },
});
export default HomeStyles;
