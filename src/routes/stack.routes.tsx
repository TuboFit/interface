import React from 'react';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { TreinoSave } from '../pages/TreinoSave';

import { createStackNavigator } from '@react-navigation/stack';
import colors from '../../styles/colors';
import AuthRoutes from './tab.routes';


const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
        />

        <stackRoutes.Screen
            name="TreinoSelect"
            component={AuthRoutes}
        />

        <stackRoutes.Screen
            name="MyInformation"
            component={AuthRoutes}
        />

        <stackRoutes.Screen
            name="TreinoSave"
            component={TreinoSave}
        />

        <stackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;