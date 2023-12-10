import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatusBarHeight = StatusBar.currentHeight;

const Cabecalho = ({ navigation }) => {
    const navigateToHome = () => {
        navigation.navigate('Início');
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.statusBarBackground} />
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.logoContainer} onPress={navigateToHome}>
                    <Ionicons name="md-home" size={28} color="#D22E2E" />
                    <Text style={styles.logoText}>MosquitoMinder</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
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
    statusBarBackground: {
        height: StatusBarHeight,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
});

export default Cabecalho;
