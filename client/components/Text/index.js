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
    fontSize = 20,
    textAlign = 'left',
    textColor,
    style,
    marginBottom,
    marginTop,
    marginRight,
    marginLeft,
    paddingBottom,
    paddingTop,
    paddingRight = 4,
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
      ? 16
      : size === 'small'
      ? 18
      : size === 'big'
      ? 20
      : size === 'veryBig'
      ? 22
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
        fontWeight: isBold ? '600' : isSuperBold ? '700' : '400',
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
        // fontFamily: 'Caveat_400Regular',
        // fontFamily: 'Caveat_600SemiBold',
        // fontFamily: 'Caveat_700Bold',

        fontFamily: isSuperBold
          ? 'Caveat_700Bold'
          : isBold
          ? 'Caveat_600SemiBold'
          : isLight
          ? 'Caveat_400Regular'
          : 'Caveat_500Medium',
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
