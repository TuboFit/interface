import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../../styles/colors';
import { TreinoSelect } from '../pages/TreinoSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyInformation } from '../pages/MyInformation';
import { Platform } from 'react-native';

const AppTab = createBottomTabNavigator();


const AuthRoutes = () => {
    return (
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.orange,
                inactiveTintColor: "#FFF",
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 68,
                    backgroundColor: '#161618',
                }
            }}>
            <AppTab.Screen
                name="Meu Treino"
                component={TreinoSelect}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name='add-circle-outline'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <AppTab.Screen
                name="Minhas Informações"
                component={MyInformation}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </AppTab.Navigator>
    )
}

export default AuthRoutes;