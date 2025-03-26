import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/Presentation/views/home/home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { LoadingScreen } from './src/Presentation/components/LoadingScreen';
import { ForgotPasswordScreen } from './src/Presentation/views/recuperar/recuperar';
import { GuardaLoadingScreen } from './src/Presentation/views/guarda/GuardaLoadingScreen';
import { ResidenteLoadingScreen } from './src/Presentation/views/residente/ResidenteLoadingScreen';
import { AdminLoadingScreen } from './src/Presentation/views/admin/AdminLoadingScreen';
import { registeradminloading } from './src/Presentation/views/admin/registeradminloading';
import { registerloadinresidente } from './src/Presentation/views/residente/registerloadinresidente';
import { guardaregistroloading } from './src/Presentation/views/guarda/guardaregistroloading';
import { residentebienvenido } from './src/Presentation/views/residente/bienvenidoresidente';
import { Guardabienvenido } from './src/Presentation/views/guarda/bienvenidoguarda';
import { adminbienvenido } from './src/Presentation/views/admin/bienvenidoadmin';
import  ResidentePrincipal  from './src/Presentation/views/residente/residenteprincipal';


export type RootStackParamList = {
    HomeScreen: undefined;
    RegisterScreen: undefined;
    ForgotPasswordScreen: undefined;
    GuardaLoadingScreen: undefined;
    ResidenteLoadingScreen: undefined;
    AdminLoadingScreen: undefined;
    registeradminloading: undefined;
    registerloadinresidente: undefined;
    guardaregistroloading: undefined;
    residentebienvenido: undefined;
    Guardabienvenido: undefined;
    adminbienvenido:undefined;
    ResidentePrincipal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <Stack.Screen name="GuardaLoadingScreen" component={GuardaLoadingScreen} />
                <Stack.Screen name="ResidenteLoadingScreen" component={ResidenteLoadingScreen} />
                <Stack.Screen name="AdminLoadingScreen" component={AdminLoadingScreen} />
                <Stack.Screen name="registeradminloading" component={registeradminloading} />
                <Stack.Screen name="registerloadinresidente" component={registerloadinresidente} />
                <Stack.Screen name="guardaregistroloading" component={guardaregistroloading} />
                <Stack.Screen name="residentebienvenido" component={residentebienvenido} />
                <Stack.Screen name="Guardabienvenido" component={Guardabienvenido} />
                <Stack.Screen name="adminbienvenido" component={adminbienvenido} />
                <Stack.Screen name="ResidentePrincipal" component={ResidentePrincipal} />
                


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;