// External Imports - libary i don't own
import React, { useCallback, useRef, useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Dimensions, View, Image, Animated, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

// External Internal my library, not my server
import * as Linking from 'expo-linking';
// Internal Imports - my library, my server
import TextComponent from '../TextComponent';
import CircledLetter from '../CircledLetter';
import { CenteredContainer } from '../../layout';
import { Link } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

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
  const { colors } = useTheme();

  const [showVideo, setShowVideo] = useState(false);

  const handlePressVideoCover = () => {
    setShowVideo(true);
  };

  const opacityAnimation = useRef(new Animated.Value(0)).current;

  const handleOnLoadEnd = useCallback(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [opacityAnimation]);
  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    // Ternary operator example
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
      <CenteredContainer
        borderWidth={0}
        style={{ backgroundColor: bgColor, borderRadius: 16, padding: 12 }}
        color={bgColor}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // height: 160,
            width: '100%',
            borderColor: 'transparent',
            borderWidth: 0.5,
            borderRadius: 18,
            marginHorizontal: 6,
            marginVertical: 6,
            paddingHorizontal: 24,
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

              {title ? <TextComponent style={{ fontSize: 18 }}>{title}</TextComponent> : null}
            </TouchableOpacity>

            <TextComponent>{subtitle}</TextComponent>
            <TextComponent>sdf</TextComponent>
            {/* <View style={{ flexDirection: 'row' }}>
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
            </View> */}

            {/* <TouchableOpacity
              onPress={handlePressVideoCover}
              style={{
                backgroundColor: colors.loadingPlaceholder,
                height: 220,
                marginTop: 12,
              }}
              activeOpacity={1}
            >
              <Animated.View
                style={[
                  {
                    opacity: opacityAnimation,
                  },
                ]}
              >
                <ImageBackground
                  onLoad={handleOnLoadEnd}
                  height={220}
                  style={{
                    position: 'relative',
                    width: screenWidth - 48,
                    resizeMode: 'stretch',
                    height: 220,
                  }}
                  source={{
                    uri: `https://img.youtube.com/vi/rBLuvEwIF5E/0.jpg`,
                  }}
                >
                  <View
                    style={{
                      opacity: 0.6,
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: colors.lightBackground,
                    }}
                  >
                    <Entypo name="youtube" size={40} color="black" style={{ zIndex: 30 }} />
                  </View>
                </ImageBackground>
              </Animated.View>
            </TouchableOpacity> */}

            {showVideo ? (
              <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: `https://youtu.be/rBLuvEwIF5E?autoplay=1` }}
              />
            ) : null}
          </View>
        </View>
      </CenteredContainer>
    </TouchableOpacity>
  );
};

export default Card;
