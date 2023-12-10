import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';

const MapScreen = () => {
  const locais = [
    {
      nome: 'Centro',
      latitude: -7.882920318443776,
      longitude: -40.080608617280504,
      casos: 36,
    },
    {
      nome: 'COHAB',
      latitude: -7.879152380609358,
      longitude: -40.075015315932625,
      casos: 11,
    },
    {
      nome: 'Santa Maria',
      latitude: -7.900337388945122,
      longitude: -40.09186470465367,
      casos: 11,
    },
    {
      nome: 'Nossa Senhora de Fátima',
      latitude: -7.879825252022155,
      longitude: -40.084117125020654,
      casos: 17,
    },
    {
      nome: 'São Sebastião',
      latitude: -7.883353762805413,
      longitude: -40.08271548655493,
      casos: 52,
    },
    {
      nome: 'Capela São Braz',
      latitude: -7.88162059740543,
      longitude: -40.0721454053132,
      casos: 11,
    },
    {
      nome: 'Renascença',
      latitude: -7.884444617063163,
      longitude: -40.09032113521389,
      casos: 11,
    },
    {
      nome: 'Santo Antônio',
      latitude: -7.891956696201479,
      longitude: -40.08011675070361,
      casos: 21,
    },
    {
      nome: 'Aeroporto',
      latitude: -7.879839783532234,
      longitude: -40.08951847636273,
      casos: 8,
    },
    {
      nome: 'Alto Paraíso',
      latitude: -7.889712034174563,
      longitude: -40.067173409003495,
      casos: 7,
    },
    {
      nome: 'Canacuí',
      latitude: -7.862573077312914,
      longitude: -40.088573032945234,
      casos: 4,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Índices de Casos em Ouricuri</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -7.886,
          longitude: -40.085,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {locais.map((local, index) => (
          <React.Fragment key={index}>
            <Marker
              coordinate={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
              title={local.nome}
              description={`Casos: ${local.casos}`}
            >
              <Callout>
                <View>
                  <Text>{local.nome}</Text>
                  <Text>{`Casos: ${local.casos}`}</Text>
                </View>
              </Callout>
            </Marker>
            <Circle
              center={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
              radius={local.casos * 10}
              fillColor="rgba(255, 0, 0, 0.3)"
              strokeWidth={1}
            />
          </React.Fragment>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    top: 35,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MapScreen;