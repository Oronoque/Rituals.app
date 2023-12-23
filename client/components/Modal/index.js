import React from 'react';
import Modal from 'react-native-modal';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useTheme } from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ModalComponent = (props) => {
  const { height, isOpen, onClose, children, withCloseButton = true } = props;

  const windowWidth = Dimensions.get('window').width;
  const { colors } = useTheme();

  return (
    <GestureRecognizer>
      <Modal avoidKeyboard isVisible={isOpen} style={{ margin: 0 }} onBackdropPress={onClose}>
        <View
          style={{
            height: height || '50%',
            marginTop: 'auto',
            backgroundColor: colors?.background,
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
            width: windowWidth,
            padding: 0,
          }}
        >
          <>
            {isOpen ? children : null}
            {withCloseButton ? (
              <TouchableOpacity
                onPress={onClose}
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  right: 14,
                  top: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="close" size={38} color={colors.text} />
              </TouchableOpacity>
            ) : null}
          </>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

export default ModalComponent;
