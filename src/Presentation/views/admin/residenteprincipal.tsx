import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
type Noticia = {
    id: string;
    titulo: string;
    fecha: string;
    resumen: string;
    importante: boolean;
  };
  
  // Definimos las props que recibe NoticiaItem
  type NoticiaItemProps = {
    item: Noticia;
  };
const ResidentePrincipal = () => {
  // Datos de ejemplo para las noticias
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

  // Componente para renderizar cada noticia
  const NoticiaItem = ({ item }: { item: Noticia }) => (
    <View style={[styles.noticiaItem, item.importante && styles.noticiaImportante]}>
      <View style={styles.noticiaHeader}>
        <Text style={styles.noticiaTitulo}>{item.titulo}</Text>
        <Text style={styles.noticiaFecha}>{item.fecha}</Text>
      </View>
      <Text style={styles.noticiaResumen}>{item.resumen}</Text>
      <TouchableOpacity style={styles.verMasBtn}>
        <Text style={styles.verMasText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image 
          source={require('./img/resi.png')} 
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Residente</Text>
      </View>

      {/* Menú de opciones */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Image 
            source={require('./img/resi.png')} 
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Mi apartamento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image 
            source={require('./img/resi.png')} 
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Citas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image 
            source={require('./img/resi.png')} 
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Zonas comunes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image 
            source={require('./img/resi.png')} 
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Manual de convivencia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image 
            source={require('./img/resi.png')} 
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

      {/* Pie de página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Versión 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
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
    alignSelf: 'flex-end',
  },
  verMasText: {
    color: '#3498db',
    fontSize: 14,
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
});

export default ResidentePrincipal;