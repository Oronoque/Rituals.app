import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Text from '../Text';

var Style = StyleSheet.create({
  radioForm: {},

  radioWrap: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 30,
    height: 30,

    alignSelf: 'center',

    borderColor: '#2196f3',
    borderRadius: 30,
  },

  radioLabel: {
    paddingLeft: 10,
    lineHeight: 20,
  },

  radioNormal: {
    borderRadius: 10,
  },

  radioActive: {
    width: 20,
    height: 20,
    backgroundColor: '#2196f3',
  },

  labelWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  labelVerticalWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },

  labelVertical: {
    paddingLeft: 0,
  },

  formHorizontal: {
    flexDirection: 'row',
  },
});

export class RadioButtonInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: props.buttonColor || '#2196f3',
    };
  }
  render() {
    var innerSize = { width: 20, height: 20, borderRadius: 20 / 2 };
    var outerSize = { width: 20 + 10, height: 20 + 10, borderRadius: (20 + 10) / 2 };
    if (this.props.buttonSize) {
      innerSize.width = this.props.buttonSize;
      innerSize.height = this.props.buttonSize;
      innerSize.borderRadius = this.props.buttonSize / 2;
      outerSize.width = this.props.buttonSize + 10;
      outerSize.height = this.props.buttonSize + 10;
      outerSize.borderRadius = (this.props.buttonSize + 10) / 2;
    }
    if (this.props.buttonOuterSize) {
      outerSize.width = this.props.buttonOuterSize;
      outerSize.height = this.props.buttonOuterSize;
      outerSize.borderRadius = this.props.buttonOuterSize / 2;
    }
    var outerColor = this.props.buttonOuterColor;
    var borderWidth = this.props.borderWidth || 3;
    var innerColor = this.props.buttonInnerColor;
    if (this.props.buttonColor) {
      outerColor = this.props.buttonColor;
      innerColor = this.props.buttonColor;
    }
    var c = (
      <View
        style={[
          Style.radioNormal,
          this.props.isSelected && Style.radioActive,
          this.props.isSelected && innerSize,
          this.props.isSelected && { backgroundColor: innerColor },
        ]}
      ></View>
    );
    var radioStyle = [
      Style.radio,
      {
        borderColor: outerColor,
        borderWidth: borderWidth,
      },
      this.props.buttonStyle,
      outerSize,
    ];

    if (this.props.disabled) {
      return (
        <View style={this.props.buttonWrapStyle}>
          <View style={radioStyle}>{c}</View>
        </View>
      );
    }

    return (
      <View style={this.props.buttonWrapStyle}>
        <TouchableOpacity
          accessible={this.props.accessible}
          accessibilityLabel={this.props.accessibilityLabel}
          testID={this.props.testID}
          style={radioStyle}
          onPress={this.props.onPress}
        >
          {c}
        </TouchableOpacity>
      </View>
    );
  }
}

RadioButtonInput.defaultProps = {
  buttonInnerColor: '#2196f3',
  buttonOuterColor: '#2196f3',
  disabled: false,
};

const RadioInput = ({ icon: IconComponent, text, isSelected, onPress, color }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', borderWidth: 0 }}>
        {IconComponent}
        <Text marginLeft={12}>{text}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <RadioButtonInput isSelected={isSelected} onPress={onPress} buttonColor={color} />
      </View>
    </View>
  );
};

export default RadioInput;
