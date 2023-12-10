import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Detalhes = ({ navigation, route }) => {
  const { diseaseName } = route.params;

  const getDiseaseDetails = (name) => {
    switch (name) {
      case 'Dengue':
        return {
          title: 'Dengue',
          description: 'A dengue é uma doença viral transmitida pelo mosquito Aedes aegypti. Ela pode causar febre, dores no corpo e outros sintomas graves.',
          symptoms: ['Mal estar', 'Falta de apetite', 'Febre alta', 'Manchas vermelhas no corpo', 'Dor de cabeça intensa', 'Dores no corpo', 'Dor nos olhos', 'Erupções cutâneas'],
          prevention: [
            'Elimine criadouros de mosquitos (água parada)',
            'Use repelente regularmente',
            'Utilize roupas que cubram a maior parte do corpo',
            'Mantenha telas nas janelas',
          ],
          image: require('./assets/dengue.jpg'),
        };
      case 'Zika':
        return {
          title: 'Zika',
          description: 'A Zika é uma doença viral transmitida principalmente pelo mosquito Aedes aegypti. Pode causar febre, erupções cutâneas e outros sintomas.',
          symptoms: ['Tosse e Vômitos', 'Irritação na pele', 'Febre baixa', 'Erupções cutâneas', 'Dor nas articulações', 'Conjuntivite', 'Dor muscular'],
          prevention: [
            'Elimine criadouros de mosquitos (água parada)',
            'Use repelente regularmente',
            'Utilize roupas que cubram a maior parte do corpo',
            'Mantenha telas nas janelas',
          ],
          image: require('./assets/zica.jpg'),
        };
      case 'Chikungunya':
        return {
          title: 'Chikungunya',
          description: 'A Chikungunya é uma doença transmitida pelo mosquito Aedes aegypti. Pode causar febre, dores nas articulações e outros sintomas.',
          symptoms: ['Febre alta', 'Dor nas articulações intensa', 'Dor nas costas', 'Dor de cabeça', 'Erupções cutâneas'],
          prevention: [
            'Elimine criadouros de mosquitos (água parada)',
            'Use repelente regularmente',
            'Utilize roupas que cubram a maior parte do corpo',
            'Mantenha telas nas janelas',
          ],
          image: require('./assets/chikungunya.jpg'),
        };
      default:
        return {
          title: 'Detalhes da Doença',
          description: 'Nenhuma informação disponível.',
          symptoms: [],
          prevention: [],
          image: require('./assets/dengue.jpg'),
        };
    }
  };

  const { title, description, symptoms, prevention, image } = getDiseaseDetails(diseaseName);

  const navigateToHome = () => {
    navigation.navigate('Início');
  };

  const navigateToPrevention = () => {
    navigation.navigate('Prevencao');
  };

  const navigateToMS = () => {
    const ministerioDaSaudeURL = 'https://www.saude.gov.br/';
    Linking.openURL(ministerioDaSaudeURL);
  };

  const share = async () => {
    try {
      const result = await Share.share({
        message: `Informações sobre ${title}:\n${description}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={navigateToHome}>
          <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {title}
        </Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={share}>
          <Ionicons name="share-social" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Image source={image} style={styles.cardImage} />
      <Text style={{ ...styles.infoText, marginTop: 15, }}>{description}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.cardTitle}>Sintomas:</Text>
        {symptoms.map((symptom, index) => (
          <View key={index} style={[styles.cardItem, criticalContainer(symptom) && styles.criticalSymptom]}>
            <Ionicons name="md-medical" size={20} color="#D22E2E" style={styles.icon} />
            <Text style={styles.cardText}>{symptom}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.cardTitle}>Cuidados:</Text>
        {prevention.map((preventiveMeasure, index) => (
          <View key={index} style={styles.cardItem}>
            <Ionicons name="md-shield-checkmark" size={20} color="#D22E2E" style={styles.icon} />
            <Text style={styles.cardText}>{preventiveMeasure}</Text>
          </View>
        ))}
        <TouchableOpacity style={{
          width: '75%', backgroundColor: '#D22E2E', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 5,
        }}
          onPress={navigateToPrevention}>
          <Text style={{ color: '#FFFFFF', fontSize: 15 }}>
            Saiba mais sobre a prevenção<Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={navigateToMS}>
          <Image source={require('./assets/ms.png')} style={styles.ministerioLogo} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const criticalContainer = (symptom) => {
  const criticalSymptoms = ['Dor nas articulações intensa', 'Febre alta', 'Dor de cabeça intensa', 'Dor nos olho', 'Erupções cutâneas', 'Febre alta', 'Erupções cutâneas'
  ];
  return criticalSymptoms.includes(symptom);
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 17,
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
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    fontSize: 16,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  criticalSymptom: {
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#FFD0D0',
  },
  buttonContainer: {
    padding: 7,
    backgroundColor: '#D22E2E',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  ministerioLogo: {
    width: 120,
    height: 40,
  },
});

export default Detalhes;