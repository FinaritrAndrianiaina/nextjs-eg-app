import { Image, ImageProps } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

interface ExpoImageProps extends ImageProps {
  borderRadius?: number;
}

const ExpoImage: React.FC<ExpoImageProps> = ({
  borderRadius = 0,
  style,
  ...props
}) => {
  return <Image style={[styles.image, { borderRadius }, style]} {...props} />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ExpoImage;
