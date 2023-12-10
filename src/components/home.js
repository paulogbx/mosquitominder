import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Linking  } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../db/firebaseConnect';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho from './cabecalho/cabecalho';
import { BarChart } from 'react-native-chart-kit';

const HomeScreen = ({ navigation }) => {
  const [dengueCases, setDengueCases] = useState(0);
  const [zikaCases, setZikaCases] = useState(0);
  const [chikungunyaCases, setChikungunyaCases] = useState(0);

  const [additionalInfoVisible, setAdditionalInfoVisible] = useState(false);

  useEffect(() => {

    const database = getDatabase(firebaseConfig);

    const casosRef = ref(database, 'Casos');

    const casosListener = onValue(casosRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dengueData = data?.Dengue || 0;
        const zikaData = data?.Zika || 0;
        const chikungunyaData = data?.Chikungunya || 0;

        setDengueCases(dengueData);
        setZikaCases(zikaData);
        setChikungunyaCases(chikungunyaData);
      }
    });

    return () => {
      casosListener();
    };
  }, []);

  const toggleAdditionalInfo = () => {
    setAdditionalInfoVisible(!additionalInfoVisible);
  };

  const navigateToStats = () => {
    navigation.navigate('Estatisticas');
  };

  const navigateToDetails = (diseaseName) => {
    navigation.navigate('Detalhes', { diseaseName });
  };

  const abrirPDF = (urlDoPDF) => {
    Linking.openURL(urlDoPDF)
      .catch((err) => console.error('Erro ao abrir o PDF:', err));
  };
  
  const abrirLink = (urlDoLink) => {
    Linking.openURL(urlDoLink)
      .catch((err) => console.error('Erro ao abrir o link:', err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Cabecalho navigation={navigation} />

      <View style={styles.content}>

        <Text style={[styles.title, { borderBottomColor: '#CCC', borderBottomWidth: 1 }]}>Bem vindo!</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.cardTitle}>Aedes Aegypti</Text>
          <Text style={styles.infoText}>
            O Aedes Aegypti é o mosquito transmissor das doenças como Dengue, Zika e Chikungunya.
            Fique atento às medidas de prevenção e combate. Denuncie focos do mosquito.
          </Text>
          <Image
            source={require('./assets/miniwideHome.jpg')}
            style={{ width: '100%', height: 260, borderRadius: 10, marginTop: 10, alignSelf: 'center' }}
          />
        </View>

        <View style={styles.horizontalContent}>
          <Ionicons name="open" size={27} color="#D22E2E" />
          <Text style={styles.cardTitle}>Saiba Mais</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
          <TouchableOpacity onPress={() => navigateToDetails('Dengue')} style={styles.cardS}>
            <Image source={require('./assets/dengue.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Dengue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToDetails('Zika')} style={styles.cardS}>
            <Image source={require('./assets/zica.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Zika</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToDetails('Chikungunya')} style={styles.cardS}>
            <Image source={require('./assets/chikungunya.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Chikungunya</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerCircle} />
        </View>

        <Text style={styles.subtitle}>Número de casos em Ouricuri</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.statLabel}>Casos de Dengue:</Text>
          <Text style={styles.statValue}>{dengueCases}</Text>

          <Text style={styles.statLabel}>Casos de Zika:</Text>
          <Text style={styles.statValue}>{zikaCases}</Text>

          <Text style={styles.statLabel}>Casos de Chikungunya:</Text>
          <Text style={styles.statValue}>{chikungunyaCases}</Text>

          <BarChart
            data={{
              labels: ['Dengue', 'Zika', 'Chikungunya'],
              datasets: [
                {
                  data: [dengueCases, zikaCases, chikungunyaCases],
                },
              ],
            }}
            width={Dimensions.get('window').width - 20}
            height={220}
            chartConfig={{
              backgroundColor: '#D22E2E',
              backgroundGradientFrom: '#FCFCFC',
              backgroundGradientTo: '#FCFCFC',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(210, 46, 46, ${opacity})`,
              labels: ['85', '90', '95', '98', '100', '103', '105', '108', '110', '115'],
              yAxisLabel: 'Casos',
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={styles.chartLabel}>Casos reportados em 2022</Text>
        </View>

        <TouchableOpacity
          style={{
            ...styles.statsButton, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 25,
          }}
          onPress={navigateToStats}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="stats-chart" size={30} color="#FFFFFF" />
            <Text style={styles.buttonText}>Estatísticas por Bairros</Text>
          </View>
          <View style={{ backgroundColor: '#FCFCFC', borderRadius: 50, padding: 5 }}>
            <Ionicons name="arrow-forward" size={20} color="#D22E2E" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ ...styles.statsButton, padding: 15, backgroundColor: '#F5F5F5', borderColor: '#D22E2E', borderWidth: 2, borderRadius: 10, }} onPress={toggleAdditionalInfo}>
          <Ionicons name={additionalInfoVisible ? 'caret-up' : 'caret-down'} size={20} color="#D22E2E" />
          <Text style={{ ...styles.buttonText, color: '#D22E2E' }}>Informações Adicionais</Text>
        </TouchableOpacity>


        {
          additionalInfoVisible && (
            <View style={styles.additionalInfoContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Documentos em PDF</Text>
              <Text style={styles.linkText} onPress={() => abrirPDF('pdf1')}>
                <Ionicons name="document" size={20} color="#D22E2E" /> PDF 1
              </Text>
              <Text style={styles.linkText} onPress={() => abrirPDF('pdf2')}>
                <Ionicons name="document" size={20} color="#D22E2E" /> PDF 2
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Links Úteis</Text>
              <Text style={styles.linkText} onPress={() => abrirLink('http://www.ouricuri.pe.gov.br/novosite/secretaria/20/')}>
                <Ionicons name="globe" size={20} color="#D22E2E" style={styles.icon} /> Ministério da Saúde
              </Text>
              <Text style={styles.linkText} onPress={() => abrirLink('http://www.ouricuri.pe.gov.br/novosite/secretaria/20/')}>
                <Ionicons name="globe" size={20} color="#D22E2E" style={styles.icon} /> Secretaria de Saúde - Ouricuri, PE
              </Text>
            </View>
          </View>
          )
        }
      </View >

    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  content: {
    padding: 10,
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    fontSize: 17,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    top: 15,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D22E2E',
  },
  dividerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: '#D22E2E',
    borderWidth: 2,
    backgroundColor: '#FCFCFC',
    marginRight: 10,
  },
  statsButton: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#D22E2E',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statValue: {
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    fontSize: 16,
    color: '#333',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  buttonContent: {
    marginLeft: 10,
    flex: 1,
  },
  horizontalScrollView: {
    marginTop: 15,
    marginBottom: 5,
  },
  horizontalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  cardS: {
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 15,
    marginRight: 20,
  },
  cardImage: {
    width: 120,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
