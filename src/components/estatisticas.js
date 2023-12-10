import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../db/firebaseConnect';
import { Ionicons } from '@expo/vector-icons';

const Estatisticas = ({ navigation }) => {
    const [neighborhoodData, setNeighborhoodData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const database = getDatabase(firebaseConfig);
        const neighborhoodRef = ref(database, 'Bairros');

        const neighborhoodListener = onValue(neighborhoodRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const neighborhoodStats = Object.keys(data).map((bairro) => ({
                    bairro,
                    CasosNotificados: data[bairro],
                }));
                setNeighborhoodData(neighborhoodStats);
                setIsLoading(false);
            }
        });

        return () => {
            neighborhoodListener();
        };
    }, []);


    const contactContainer = () => {
        Alert.alert(
            'Contato Rápido',
            'Deseja entrar em contato com as autoridades de saúde?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                    },
                },
            ],
        );
    };

    const navigateToHome = () => {
        navigation.navigate('Início');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={navigateToHome}
                >
                    <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.title}>Estatísticas por Bairros</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={contactContainer}
                >
                    <Ionicons name="call" size={25} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <Text style={styles.infoText}>
                Acompanhe as estatísticas dos bairros relacionadas ao Aedes aegypti de 2022 em Ouricuri.
            </Text>

            {isLoading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#D22E2E" />
            ) : (
                <FlatList
                    style={styles.flatList}
                    data={neighborhoodData}
                    keyExtractor={(item) => item.bairro}
                    renderItem={({ item, index }) => (
                        <View style={[styles.cardItem, { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F2F2F2' }]}>
                            <Text style={styles.cardName}>{item.bairro}</Text>
                            <Text>
                                <Ionicons name="ios-warning" size={20} color="#D22E2E" />
                                Casos: {item.CasosNotificados}
                            </Text>
                        </View>
                    )}
                />
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D22E2E',
        marginTop: 15,
    },
    button: {
        padding: 7,
        marginTop: 15,
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
    infoText: {
        fontSize: 17,
        color: '#333',
    },
    cardItem: {
        marginHorizontal: 20,
        marginBottom: 15,
        padding: 15,
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
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    flatList: {
        flex: 1,
        marginTop: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Estatisticas;
