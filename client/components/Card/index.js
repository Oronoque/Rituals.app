// External Imports - libary i don't own
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// External Internal my library, not my server
import * as Linking from 'expo-linking';
// Internal Imports - my library, my server
import Text from '../Text';
import CircledLetter from '../CircledLetter';
import { CenteredContainer } from '../../layout';
import { Link } from '@react-navigation/native';

// const SubContainer = styled(Container)``;

const Card = ({
  onPress,
  title = null,
  subtitle = null,
  imgUrl = null,
  networks = [],
  websiteUrl = null,
  bgColor = 'transparent',
}) => {
  return (
    // Ternary operator example
    <TouchableOpacity
      style={{ borderWidth: 0, width: '100%' }}
      onPress={onPress}
      activeOpacity={onPress ? 1 : 0}
    >
      <CenteredContainer
        borderWidth={0}
        style={{ backgroundColor: bgColor, borderRadius: 16, padding: 12 }}
        color={bgColor}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 160,
            width: '100%',
            borderColor: 'transparent',
            borderWidth: 0.5,
            borderRadius: 18,
            marginHorizontal: 6,
            marginVertical: 6,
            paddingHorizontal: 12,
            // elevation: 12,
            backgroundColor: '#F6F7F9',
            shadowOffset: {
              width: 3,
              height: 3,
            },
            shadowColor: 'black',
            shadowOpacity: 0.7,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={websiteUrl ? 0 : 1}
              onPress={() => {
                if (websiteUrl) {
                  Linking.openURL(websiteUrl);
                }
              }}
            >
              {imgUrl ? (
                <Image
                  source={{
                    uri: imgUrl,
                  }}
                  height={60}
                  width={60}
                  style={{ borderRadius: 60, borderWidth: 0.5, borderColor: 'black' }}
                />
              ) : (
                <CircledLetter
                  text={title}
                  height={60}
                  width={60}
                  style={{
                    borderRadius: 60,
                    borderWidth: 2,
                    borderColor: 'black',
                  }}
                />
              )}

              {title ? <Text style={{ fontSize: 18 }}>{title}</Text> : null}
            </TouchableOpacity>

            <Text>{subtitle}</Text>
            <View style={{ flexDirection: 'row' }}>
              {networks.map((network) => {
                return (
                  <TouchableOpacity
                    key={network.iconName}
                    style={{
                      marginRight: 12,
                    }}
                    onPress={() => {
                      Linking.openURL(network.url).catch(() => {
                        Linking.openURL(network.url);
                      });
                    }}
                  >
                    <Ionicons name={network.iconName} size={24} color={network.iconColor} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </CenteredContainer>
    </TouchableOpacity>
  );
};

export default Card;
