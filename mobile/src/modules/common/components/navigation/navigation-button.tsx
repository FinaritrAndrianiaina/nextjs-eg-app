import {
  BellIcon,
  BotIcon,
  NewspaperIcon,
  UserIcon,
} from 'lucide-react-native';
import React, { ReactNode, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

const icon: { [key: string]: ReactNode } = {
  index: <NewspaperIcon color="black" size={22} />,
  notifications: <BellIcon color="black" size={22} />,
  profile: <UserIcon color="black" size={22} />,
  ai: <BotIcon color="black" size={22} />,
};
const TabBarButton = (props: any) => {
  const { isFocused, label, routeName, color } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  return (
    <Pressable {...props} style={styles.container}>
      <View>{icon[routeName]}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});

export default TabBarButton;
