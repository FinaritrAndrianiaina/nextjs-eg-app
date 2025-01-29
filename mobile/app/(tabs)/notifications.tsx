import { StyleSheet } from 'react-native';

import { Text } from '~//modules/common/components/ui/text';

export default function Home() {
  return (
    <>
      <Text>Hello</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
