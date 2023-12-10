import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons";

import Home from './src/components/home';
import Mapa from './src/components/mapa';
import Campanhas from './src/components/campanhas';
import Prevencao from './src/components/prevencao';
import Estatisticas from './src/components/estatisticas';
import Reportar from './src/components/reportar';
import Detalhes from './src/components/detalhes';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Início"
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Estatisticas"
      component={Estatisticas}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Detalhes"
      component={Detalhes}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    backgroundColor: 'white',
    position: 'relative',
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10,
      height: 10
    },
    paddingHorizontal: 5,
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={screenOptions}>
        <BottomTab.Screen
          name="Inicio"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="home" size={27} color={focused ? "#D22E2E" : "#111"} />
                  <Text style={{ fontSize: 13, color: "#111" }}>Início</Text>
                </View>
              )
            }
          }} />
        <BottomTab.Screen
          name="Mapa"
          component={Mapa}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="map" size={27} color={focused ? "#D22E2E" : "#111"} />
                  <Text style={{ fontSize: 13, color: "#111" }}>Mapa</Text>
                </View>
              )
            }
          }}
        />
        <BottomTab.Screen
          name="Campanhas"
          component={Campanhas}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="flag" size={27} color={focused ? "#D22E2E" : "#111"} />
                  <Text style={{ fontSize: 13, color: "#111" }}>Campanhas</Text>
                </View>
              )
            }
          }}
        />
        <BottomTab.Screen
          name="Prevencao"
          component={Prevencao}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="fitness" size={27} color={focused ? "#D22E2E" : "#111"} />
                  <Text style={{ fontSize: 12, color: "#111" }}>Prevenção</Text>
                </View>
              )
            }
          }}
        />
        <BottomTab.Screen
          name="Reportar"
          component={Reportar}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="warning" size={27} color={focused ? "#D22E2E" : "#111"} />
                  <Text style={{ fontSize: 13, color: "#111" }}>Reportar</Text>
                </View>
              )
            }
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
