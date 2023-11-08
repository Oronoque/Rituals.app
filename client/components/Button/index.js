import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import Text from '../Text';
import Loader from '../Loader';

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  height: ${(p) => p.height || 46}px;
  width: ${(p) => (p.width ? `${p.width}px` : '100%')};
  align-items: center;
  justify-content: center;
  border-radius: ${(p) => p.borderRadius || 30}px;
  elevation: 0;
`;

const Button = (props) => {
  const {
    width,
    onPress,
    title,
    primary = true,
    secondary = false,
    tiertiary = false,
    style,
    bgColor,
    borderRadius,
    height,
    disabled,
    size = 'normal',
    isNaked = false,
    isLoading = false,
    textColor,
    borderWidth = 0,
    borderColor,
    iconName,
    icon,
    iconSize = 16,
    textSize = null,
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
    if (bgColor) {
      return {
        backgroundColor: bgColor,
        color: colors.white,
      };
    }

    if (secondary) {
      return {
        backgroundColor: colors.white,
        color: colors.black,
        borderWidth: 1,
        borderColor: colors.primary,
      };
    }

    if (tiertiary) {
      return {
        backgroundColor: colors.tiertiary,
        color: colors.textSecondary,
      };
    }

    if (isNaked) {
      return {
        backgroundColor: 'transparent',
        color: textColor || colors.text,
      };
    }
    return {
      backgroundColor: colors.primary,
      color: colors.white,
    };
  }, [primary, secondary, bgColor, colors]);

  return (
    <Container
      disabled={disabled}
      width={width}
      height={height || sizes[size].height}
      primary={primary}
      borderRadius={borderRadius}
      onPress={disabled ? () => null : onPress}
      style={{ ...style, borderWidth, borderColor, ...getButtonStyle, opacity: disabled ? 0.5 : 1 }}
    >
      {iconName ? (
        <View
          style={{
            position: 'absolute',
            left: 12,
          }}
        >
          <Ionicons name={iconName} size={iconSize} color={colors.white} />
        </View>
      ) : null}

      {icon ? (
        <View
          style={{
            position: 'absolute',
            left: 12,
          }}
        >
          {icon}
        </View>
      ) : null}

      {isLoading ? (
        <Loader size="small" />
      ) : (
        <Text
          marginLeft={icon || iconName ? 20 : 0}
          textColor={getButtonStyle.color}
          fontSize={textSize ? textSize : iconName ? 12 : sizes[size].fontSize}
          isBold
        >
          {title}
        </Text>
      )}
    </Container>
  );
};

export default Button;
