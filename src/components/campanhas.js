import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Cabecalho from './cabecalho/cabecalho';

const CampaignsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };


  const campaigns = [
    {
      title: 'Campanha de Prevenção contra o Aedes aegypti',
      date: '1 de março a 30 de março',
      location: 'Bairros da Cidade',
      description: 'Participe da campanha de conscientização e prevenção contra o Aedes aegypti. Elimine focos de água parada e proteja sua comunidade.',
    },
    {
      title: 'Mutirão de Limpeza nos Reservatórios de Água',
      date: '10 de maio a 25 de maio',
      location: 'Residências e Empresas',
      description: 'Junte-se ao mutirão de limpeza para eliminar possíveis criadouros do Aedes aegypti em reservatórios de água. Vamos combater juntos o mosquito transmissor da dengue, zika e chikungunya.',
    },
    {
      title: 'Dia D contra o Aedes',
      date: '5 de julho',
      location: 'Praças Públicas',
      description: 'No Dia D contra o Aedes, participe de atividades educativas, distribuição de materiais informativos e inspeção de possíveis focos do mosquito. Vamos unir esforços para erradicar o Aedes aegypti.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Cabecalho navigation={navigation} />

      <View style={styles.content}>
        <Text style={styles.title}>Campanhas de Conscientização</Text>
        <Text style={styles.infoText}>Participe e ajude a conscientizar sobre a prevenção do Aedes aegypti.</Text>

        {campaigns.map((campaign, index) => (
          <View key={index} style={styles.infoContainer}>
            <Text style={styles.cardTitle}>
              <Ionicons name="md-calendar" size={24} color="#D22E2E" /> {campaign.title}
            </Text>
            <Text style={styles.cardText}>{campaign.description}</Text>
            <Text style={styles.cardDetails}><Ionicons name="md-calendar" size={18} color="#333" /> Data: {campaign.date}</Text>
            <Text style={styles.cardDetails}><Ionicons name="md-pin" size={18} color="#333" /> Local: {campaign.location}</Text>
            <TouchableOpacity
              style={styles.statsButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Participar</Text>
            </TouchableOpacity>
          </View>
        ))}


        {modalVisible && (
          <Modal transparent visible={modalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  source={require('./assets/miniwideCamp.png')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalText}>Campanha já encerrada</Text>
                <TouchableOpacity onPress={closeModal} style={styles.statsButton}>
                  <Text style={styles.buttonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
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
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  cardDetails: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    flexDirection: 'row',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
});

export default CampaignsScreen;