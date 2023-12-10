import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../db/firebaseConnect';
import { ref, push, onValue, set } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';
import Cabecalho from './cabecalho/cabecalho';

const FIELD_NAMES = {
  descricao: 'descricao',
  informacoesAdicionais: 'informacoesAdicionais',
  gravidade: 'gravidade',
};

const ReportScreen = ({ navigation }) => {
  const [denuncia, setDenuncia] = useState({
    [FIELD_NAMES.descricao]: '',
    [FIELD_NAMES.informacoesAdicionais]: '',
    [FIELD_NAMES.gravidade]: 'Baixa',
  });
  const [denuncias, setDenuncias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const denunciasRef = ref(db, 'denuncias');
    const unsubscribe = onValue(denunciasRef, (snapshot) => {
      const denunciasData = snapshot.val();
      if (denunciasData) {
        const denunciasArray = Object.values(denunciasData);
        setDenuncias(denunciasArray);
      } else {
        setDenuncias([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!denuncia[FIELD_NAMES.descricao].trim()) {
        Alert.alert('Erro', 'Preencha todos campos antes de enviar a denúncia.');
        return;
      }

      const denunciaRef = ref(db, 'denuncias');
      const novaDenunciaRef = push(denunciaRef);
      await set(novaDenunciaRef, {
        ...denuncia,
        data: new Date().toISOString(),
      });


      Alert.alert('Enviado!', 'Denúncia encaminhada, obrigado por contribuir para o combate ao Aedes aegypti!');
    } catch (error) {
      console.error('Erro ao enviar denúncia:', error.message);
      Alert.alert('Erro', 'Erro ao enviar a denúncia.');
    } finally {
      setIsLoading(false);
    }
  }, [denuncia]);

  const { descricao, informacoesAdicionais, gravidade } = denuncia;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Cabecalho navigation={navigation} />

      <View style={styles.content}>

        <Text style={styles.title}>Reportar Foco do Mosquito</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Utilize esta página para relatar possíveis focos do Aedes aegypti. Forneça detalhes sobre o local, incluindo informações adicionais e selecione a gravidade do incidente.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva o local da possível infestação..."
            multiline
            value={descricao}
            onChangeText={(text) => setDenuncia({ ...denuncia, [FIELD_NAMES.descricao]: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Informações Adicionais (opcional)"
            value={informacoesAdicionais}
            onChangeText={(text) => setDenuncia({ ...denuncia, [FIELD_NAMES.informacoesAdicionais]: text })}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            <Ionicons name="warning" size={20} color="#D22E2E" /> Nível de Gravidade:
          </Text>
          <Picker
            style={styles.picker}
            selectedValue={gravidade}
            onValueChange={(itemValue) => setDenuncia({ ...denuncia, [FIELD_NAMES.gravidade]: itemValue })}
          >
            <Picker.Item label="Baixo (Pouco Urgente)" value="Baixa" />
            <Picker.Item label="Médio (Urgente)" value="Média" />
            <Picker.Item label="Alto (Muito Urgente)" value="Alta" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.statsButton}
          onPress={handleSubmit}
          accessible={true}
          accessibilityLabel="Enviar Denúncia"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
              <Ionicons name="send" size={20} color="white" />
              <Text style={styles.buttonText}>Enviar Denúncia</Text>
            </>
          )}
        </TouchableOpacity>

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
    padding: 20,
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
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
  infoText: {
    fontSize: 17,
    color: '#333',
    marginBottom: 15,
  },
  input: {
    height: 120,
    borderColor: '#DDD',
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    fontSize: 16,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FCFCFC',
    borderRadius: 10,
    marginBottom: 10,
  },
  statsButton: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
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
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});

export default ReportScreen;
