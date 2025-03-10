import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
export default function App() {
return (
<View style={styles.container}>
<Image
source={ require('./assets/c46b71490cb2abe51cbe10e6fd48e19a.jpg')}
style={styles.imageBackground}
/>

</View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
imageBackground: {
width: '100%',
height: '100%',
},
});