import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import TextComponent from '../TextComponent';
import Loader from '../Loader';

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  height: ${(p) => p.height || 46}px;
  width: ${(p) => (p.width ? `${p.width}px` : '100%')};
  align-items: center;
  justify-content: ${(p) => p.justifyContent || 'center'};
  border-radius: ${(p) => p.borderRadius || 30}px;
  elevation: 0;
  background-color: transparent; // Set background to transparent
`;

const Button = (props) => {
  const {
    width,
    onPress,
    title,
    style,
    borderRadius,
    height,
    disabled,
    size = 'normal',
    isLoading = false,
    iconSize = 16,
    iconName,
    icon,
    textSize = null,
    customStyle = {},
  } = props;

  const { colors } = useTheme();

  const sizes = {
    verySmall: {
      height: 30,
      fontSize: 16,
    },
    small: {
      height: 30,
      fontSize: 18,
    },
    normal: {
      height: 40,
      fontSize: 20,
    },
  };

  const getButtonStyle = useMemo(() => {
    return {
      color: 'black',
      ...customStyle,
    };
  }, [customStyle]);

  return (
    <Container
      disabled={disabled}
      width={width}
      height={height || sizes[size].height}
      borderRadius={borderRadius}
      onPress={disabled ? () => null : onPress}
      style={{ ...style, opacity: disabled ? 0.5 : 1 }}
      justifyContent={style?.alignItems === 'flex-start' ? 'flex-start' : 'center'}
    >
      {iconName && (
        <View style={{ position: 'absolute', left: 12 }}>
          <Ionicons name={iconName} size={iconSize} color={colors.white} />
        </View>
      )}

      {icon && <View style={{ position: 'absolute', left: 12 }}>{icon}</View>}

      {isLoading ? (
        <Loader size="small" />
      ) : (
        <TextComponent
          marginLeft={icon || iconName ? 20 : 0}
          textColor={getButtonStyle.color}
          fontSize={textSize ? textSize : iconName ? 12 : sizes[size].fontSize}
          style={{ alignSelf: 'center', ...customStyle }}
          isBold
        >
          {title}
        </TextComponent>
      )}
    </Container>
  );
};

export default Button;
