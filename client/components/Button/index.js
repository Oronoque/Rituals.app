// import React from 'react';
// import { Text, TouchableOpacity } from 'react-native';
// import { useTheme } from 'styled-components/native';

// const Button = ({ onPress, title, size = 'medium', customStyle, isDisabled = false }) => {
//   const { colors } = useTheme();

//   const getStyling = () => {
//     if (size === 'small') {
//       return {
//         height: 40,
//         width: 100,
//       };
//     }
//     if (size === 'medium') {
//       return {
//         height: 44,
//         // width: 200,
//         paddingHorizontal: 12,
//       };
//     }
//   };

//   const style = getStyling();

//   return (
//     <TouchableOpacity
//       activeOpacity={isDisabled ? 1 : 0}
//       onPress={onPress}
//       style={{
//         height: style.height,
//         width: style.width || 100,
//         borderRadius: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginVertical: 12,
//         backgroundColor: isDisabled ? colors.disabled : colors.primary,
//         ...customStyle,
//       }}
//     >
//       <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// export default Button;

import React, { useEffect, useMemo } from 'react';
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
      fontSize: 11,
    },
    small: {
      height: 30,
      fontSize: 12,
    },
    normal: {
      height: 40,
      fontSize: 14,
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
