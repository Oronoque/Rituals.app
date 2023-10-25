import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  TouchableOpacity,
  View,
  Image,
  FlatList,
  RefreshControl,
  StyleSheet,
  useColorScheme,
  Linking,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Card from '../components/Card';
import { getPartners } from '../hooks/queries/partner';

import { ScreenContainer } from '../layout';
import { AppContext } from '../contexts/appContext';

const partnerDataMock = [
  {
    id: 1,
    profilePictureUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.suWnt_5-xYiRW5WJchF7kQHaEK%26pid%3DApi&f=1&ipt=82c205170da76aadf6f64ce3c2e1eb78001780784289d66790f442b4ae743011&ipo=images',
    name: 'Maxime',
    description: 'Fat Cow',
    websiteUrl: 'https://lucasmaddy.com/',
    youtube: 'https://www.youtube.com/channel/UCpANroLvxuTmOi5vZ230SEA',
    facebook: 'https://www.facebook.com/lucasmaddy',
    twitter: null,
    instagram: null,
  },
  {
    id: 2,
    profilePictureUrl:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.suWnt_5-xYiRW5WJchF7kQHaEK%26pid%3DApi&f=1&ipt=82c205170da76aadf6f64ce3c2e1eb78001780784289d66790f442b4ae743011&ipo=images',
    name: 'mike',
    description: 'Fat pig',
    // websiteLinkImage: <Entypo name="link" size={24} color="#157DE1" />,
    youtube: null,
    youTubeIcon: <Ionicons name="logo-youtube" size={24} color="red" />,
    facebook: null,
    facebookIcon: <Ionicons name="logo-facebook" size={24} color="#4267B2" />,
    twitter: 'https://twitter.com/LucasMaddy',
    twitterIcon: <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />,
    instagram: 'lucasmaddymusic',
    instagramIcon: <Entypo name="instagram-with-circle" size={24} color="#E1306C" />,
  },
];

function PartnersScreen({ navigation }) {
  const { appData, updateAppData } = useContext(AppContext);
  const { colors } = useTheme();
  const { data, isLoading, error } = getPartners({});

  console.log(data, isLoading, error);

  return (
    <ScreenContainer>
      <Header title="PARTNERS" navigation={navigation} />
      <FlatList
        paddingHorizontal={12}
        numColumns={2}
        data={data}
        // data={partnerDataMock}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                marginVertical: 12,
                paddingHorizontal: 12,
              }}
            >
              <Card
                title={item.name}
                subtitle={item.description}
                imgUrl={item.profilePictureUrl}
                networks={[
                  { iconName: 'logo-facebook', url: 'https://www.google.com', iconColor: 'blue' },
                  { iconName: 'logo-twitter', url: 'https://www.google.com', iconColor: 'orange' },
                  {
                    iconName: 'logo-instagram',
                    url: 'https://www.google.com',
                    iconColor: 'yellow',
                  },
                  { iconName: 'logo-youtube', url: 'https://www.youtube.com', iconColor: 'red' },
                ]}
                websiteUrl={item.websiteUrl}
                onPress={() => {
                  Linking.openURL(item.websiteUrl);
                  // navigation.push('CreateRitual');
                }}
              />
            </View>
          );
        }}
      />
    </ScreenContainer>
  );
}

export default PartnersScreen;
