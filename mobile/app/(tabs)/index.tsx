import React from 'react';
import { ScrollView } from 'react-native';

import HomeScreen from '~//modules/common/screens/home';

export default function DiscoveryScreen() {
  return (
    <ScrollView className="flex-1  bg-white ">
      <HomeScreen />
    </ScrollView>
  );
}
