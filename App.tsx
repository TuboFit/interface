import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fonstLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const subscrition = Notifications.addNotificationReceivedListener(
      async notifications => {
        const data = notifications.request.content.data.plant as PlantProps;
        console.log(data)
      })
    return () => subscrition.remove();

    // async function notications() {
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log('NOTIFICAÇÕES********')
    //   console.log(data)
    // }
    // notications();
  })
  if (!fonstLoaded) {
    return (
      <AppLoading />
    )
  }
  return (
    <Routes />
  );
}

