import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho from './cabecalho/cabecalho';

const PreventionScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Cabecalho navigation={navigation} />

      <View style={styles.content}>

        <Text style={styles.title}>Medidas Preventivas contra o Aedes aegypti</Text>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerCircle} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>Dicas para evitar a proliferação do mosquito:</Text>
          <Text style={styles.cardText}>
            <Ionicons name="ios-water" size={20} color="#D22E2E" /> Elimine recipientes que possam acumular água parada, como pneus velhos, garrafas e latas.
          </Text>
          <Text style={styles.cardText}>
            <Ionicons name="ios-water" size={20} color="#D22E2E" /> Mantenha caixas d'água, piscinas e outros reservatórios de água sempre fechados e limpos.
          </Text>
          <Text style={styles.cardText}>
            <Ionicons name="ios-flower" size={20} color="#D22E2E" /> Evite o acúmulo de água nos pratinhos de vasos de plantas.
          </Text>
          <Text style={styles.cardText}>
            <Ionicons name="ios-home" size={20} color="#D22E2E" /> Utilize telas em janelas e portas para impedir a entrada do mosquito.
          </Text>
          <Text style={styles.cardText}>
            <Ionicons name="ios-body" size={20} color="#D22E2E" /> Aplique repelente em áreas expostas do corpo, especialmente durante o amanhecer e entardecer.
          </Text>
          <Text style={styles.cardText}>
            <Ionicons name="ios-trash" size={20} color="#D22E2E" /> Colabore com a limpeza de terrenos baldios e evite o acúmulo de lixo.
          </Text>
        </View>

        <Text style={{ ...styles.cardTitle, marginTop: 20, }}>Fique atento aos sintomas do Aedes aegypti</Text>
        <View style={styles.miniCardsContainer}>
          <View style={[styles.miniCard, { backgroundColor: '#FFD3D3' }]}>
            <Ionicons name="medical" size={24} color="#D22E2E" />
            <Text style={styles.miniCardText}>
              Febre, dor de cabeça, dores no corpo e nas articulações.
            </Text>
          </View>
          <View style={[styles.miniCard, { backgroundColor: '#FFD3D3' }]}>
            <Ionicons name="medical" size={24} color="#D22E2E" />
            <Text style={styles.miniCardText}>
              Manchas vermelhas na pele, coceira e fraqueza.
            </Text>
          </View>
        </View>

        <Text style={{ ...styles.cardTitle, marginTop: 20 }}>Práticas de Prevenção</Text>
        <View style={styles.miniCardsContainer}>
          <View style={[styles.miniCard, { backgroundColor: '#A8DACC' }]}>
            <Ionicons name="medkit" size={20} color="#457B9D" />
            <Text style={styles.miniCardText}>
              Aplique repelentes, especialmente em regiões de incidência.
            </Text>
          </View>
          <View style={[styles.miniCard, { backgroundColor: '#A8DACC' }]}>
            <Ionicons name="medkit" size={20} color="#457B9D" />
            <Text style={styles.miniCardText}>
              Ao identificar sintomas, é recomendável buscar orientação médica.
            </Text>
          </View>
        </View>

      </View>
    </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    top: 15,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 17,
    marginBottom: 10,
    color: '#333',
    lineHeight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    width: '46%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  miniCardText: {
    fontSize: 17,
    marginLeft: 10,
    color: '#333',
  },
});

export default PreventionScreen;
