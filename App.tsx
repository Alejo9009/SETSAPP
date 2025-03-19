import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/Presentation/views/home/home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { LoadingScreen } from './src/Presentation/components/LoadingScreen'; 

export type RootStackParamList = {
    HomeScreen: undefined;
    RegisterScreen: undefined;
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
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{
                        headerShown: true,
                        title: 'Registro',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;