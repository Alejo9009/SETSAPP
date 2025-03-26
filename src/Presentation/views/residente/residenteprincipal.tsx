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
        <MaterialIcons name="arrow-forward" size={16} color="#3498db" />
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
            <Text style={styles.welcomeText}>Bienvenido,</Text>
            <Text style={styles.userName}>Residente</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.notificationIcon}
          onPress={() => navigation.navigate('Notificaciones')}
        >
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

        {/* Menú de opciones (organizado verticalmente) */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Apartamento')}
          >
            <Image 
              source={require('./img/departamento.png')} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Mi apartamento</Text>
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
              source={require('./img/fiesta.png')} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Zonas comunes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Manual')}
          >
            <Image 
              source={require('./img/instrucciones.png')} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Manual de convivencia</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Perfil')}
          >
            <Image 
              source={require('./img/ajustes.png')} 
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Mi Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Noticias */}
        <View style={styles.noticiasSection}>
          <Text style={styles.sectionTitle}>Últimas Noticias</Text>
          <FlatList
            data={noticias}
            renderItem={NoticiaItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.verTodasBtn}>
            <Text style={styles.verTodasText}>Ver todas las noticias</Text>
          </TouchableOpacity>
        </View>


       <View style={styles.footer}>
          <Text style={styles.footerText}>Versión 1.0.0</Text>
        </View>
      </ScrollView>


      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Inicio')}
        >
          <Ionicons name="home-outline" size={24} color="#4A90E2" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Documentos')}
        >
          <Ionicons name="document-text-outline" size={24} color="#888" />
          <Text style={styles.navText}>Documentos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Perfil')}
        >
          <Ionicons name="person-outline" size={24} color="#888" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out-outline" size={24} color="#888" />
          <Text style={styles.navText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    color: '#444',
  },
  noticiasSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingLeft: 5,
  },
  noticiaItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noticiaImportante: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  noticiaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  noticiaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  noticiaFecha: {
    fontSize: 12,
    color: '#888',
  },
  noticiaResumen: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  verMasBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  verMasText: {
    color: '#3498db',
    fontSize: 14,
    marginRight: 5,
  },
  verTodasBtn: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
  verTodasText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    color: '#888',
    marginTop: 4,
  },


  scrollContent: { // Nuevo estilo para el contenido del ScrollView
    padding: 20,
    paddingTop: 30, // Aumentamos el padding superior para bajar el contenido
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
  welcomeContainer: { // Nuevo contenedor para los textos
    marginTop: 10, // Añadimos margen superior para bajar los textos
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 2, // Pequeño espacio entre "Bienvenido," y "Residente"
  },
});

export default ResidentePrincipal;