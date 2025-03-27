import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';

type Noticia = {
  id: string;
  titulo: string;
  fecha: string;
  resumen: string;
  importante: boolean;
};

const ResidentePrincipal = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const noticias = [
    {
      id: '1',
      titulo: 'Mantenimiento de ascensores',
      fecha: '15 Jun 2024',
      resumen: 'Los ascensores estarán en mantenimiento el próximo lunes de 9:00 a 13:00 horas',
      importante: true
    },
    {
      id: '2',
      titulo: 'Reunión de comunidad',
      fecha: '10 Jun 2024',
      resumen: 'Convocatoria a reunión extraordinaria el viernes 21 de junio a las 18:00',
      importante: false
    },
    {
      id: '3',
      titulo: 'Nuevo horario de piscina',
      fecha: '5 Jun 2024',
      resumen: 'A partir del 1 de julio la piscina tendrá nuevo horario de uso',
      importante: false
    },
  ];

  const NoticiaItem = ({ item }: { item: Noticia }) => (
    <View style={[styles.noticiaItem, item.importante && styles.noticiaImportante]}>
      <View style={styles.noticiaHeader}>
        <Text style={styles.noticiaTitulo}>{item.titulo}</Text>
        <Text style={styles.noticiaFecha}>{item.fecha}</Text>
      </View>
      <Text style={styles.noticiaResumen}>{item.resumen}</Text>
      <TouchableOpacity style={styles.verMasBtn}>
        <Text style={styles.verMasText}>Ver más</Text>
        <MaterialIcons name="arrow-forward" size={16} color="#091f09" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent} // Añadimos esto
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={require('./img/resi.png')} 
            style={styles.logo}
          />
          <View style={styles.welcomeContainer}> {/* Añadimos este contenedor */}
          <Text style={styles.userName}>Residente</Text>
            <Text style={styles.welcomeText}>Ronaldo</Text>
          
          </View>
        </View>
        <TouchableOpacity 
          style={styles.notificationIcon}
          onPress={() => navigation.navigate('Notificaciones')}
        >
          <Ionicons name="notifications-outline" size={24} color="#1d4a1d" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

        {/* Menú de opciones (organizado verticalmente) */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Parqueadero')}
          >
            <Image 
              source={require('./img/estacionamiento (1).png')} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Parqueadero</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Citas')}
          >
            <Image 
              source={require('./img/cita.png')} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Citas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('ZonasComunes')}
          >
            <Image 
              source={require('./img/eeeeeeeeeeeeeeee.png')} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Zonas comunes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Manual')}
          >
            <Image 
              source={require('./img/manual.png')} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Manual de Convivencia</Text>
          </TouchableOpacity>


        </View>

        {/* Sección de Noticias */}
        <View style={styles.noticiasSection}>
          <Text style={styles.sectionTitle}>🔔 ANUNCIOS🔔 </Text>
          <FlatList
            data={noticias}
            renderItem={NoticiaItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>


       <View style={styles.footer}>
          <Text style={styles.footerText}>Versión 0.1.0</Text>
        </View>
      </ScrollView>


      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Inicio')}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Documentos')}
        >
         <Ionicons name="card-outline" size={24} color="#fff" />
         <Text style={styles.navText}>Pagos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Perfil')}
        >
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Cerrar Session</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 2,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginBottom: 60, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 60,
    borderRadius: 50,
    marginRight: 46,
  },
  welcomeText: {
    fontSize: 19,
    color: '#0d330d',
    fontWeight: '900',
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0d330d',

  },
  notificationIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#092b09',
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 12.5,
    shadowRadius: 5,
    elevation: 6,
  },
  menuIcon: {
    width: 55,
    height: 55,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#092b09',
    fontWeight: '700',
  },
  noticiasSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#092b05',
    marginBottom: 15,
    paddingLeft: 45,
    alignItems: 'center',
  },
  noticiaItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#1e871e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1.1,
    shadowRadius: 5,
    elevation: 7,
  },
  noticiaImportante: {
    borderLeftWidth: 14,
    borderLeftColor: '#1e871e',
  },
  noticiaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  noticiaTitulo: {
    fontSize: 16,
    fontWeight: '900',
    color: '#032109',
    flex: 1,
  },
  noticiaFecha: {
    fontSize: 10,
    color: '#1e871e',
  },
  noticiaResumen: {
    fontSize: 14,
    color: '#1e871e',
    marginBottom: 10,
  },
  verMasBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  verMasText: {
    color: '#1e871e',
    fontSize: 14,
    marginRight: 5,
  },
  verTodasBtn: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
  verTodasText: {
    color: '#1e871e',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#091f09',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#091f09',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    fontWeight: 900
  },
  scrollContent: { 
    padding: 20,
    paddingTop: 30, 
  },
  welcomeContainer: { 
    marginTop: 10,
  },

});

export default ResidentePrincipal;