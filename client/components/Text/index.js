import React from 'react';
import { useTheme } from 'styled-components/native';
import { Text } from 'react-native';

const TextComponent = (props) => {
  const {
    children,
    size = 'medium',
    isBold = false,
    isLight = false,
    isSuperBold = false,
    fontSize = 14,
    textAlign = 'left',
    textColor,
    style,
    marginBottom,
    marginTop,
    marginRight,
    marginLeft,
    paddingBottom,
    paddingTop,
    paddingRight,
    paddingLeft,
    textDecorationLine,
    fontStyle,
    customStyle,
    numberOfLines,
    textTransform,
    onTextLayout,
    ...otherProps
  } = props;

  const { colors } = useTheme();

  const finalFontSize =
    size === 'verySmall'
      ? 10
      : size === 'small'
      ? 12
      : size === 'big'
      ? 16
      : size === 'veryBig'
      ? 18
      : fontSize;

  return (
    <Text
      onTextLayout={onTextLayout}
      numberOfLines={numberOfLines}
      style={{
        textDecorationLine,
        overflow: 'hidden',
        fontStyle: fontStyle || 'normal',
        color: textColor || colors.text,
        fontSize: finalFontSize,
        fontWeight: isBold ? '600' : isSuperBold ? 'bold' : '400',
        textAlign,
        marginBottom,
        textTransform,
        marginTop,
        marginRight,
        marginLeft,
        paddingBottom,
        paddingTop,
        paddingRight,
        paddingLeft,
        fontFamily:
          fontStyle === 'italic'
            ? 'Montserrat_400Regular_Italic'
            : isBold
            ? 'Montserrat_600SemiBold'
            : isLight
            ? 'Montserrat_300Light'
            : 'Montserrat_400Regular',
        ...style,
        ...customStyle,
      }}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default TextComponent;
