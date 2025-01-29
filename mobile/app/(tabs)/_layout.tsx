import { Tabs } from 'expo-router';

import TabBar from '~/modules/common/components/navigation/navigation-bottom-bar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: 'shift',
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="ai" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
