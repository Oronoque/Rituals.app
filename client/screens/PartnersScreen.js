import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { View, FlatList, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';

import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { getPartners, deletePartner } from '../hooks/queries/partner';

import { ScreenContainer } from '../layout';
import { AppContext } from '../contexts/appContext';
import ModalCreateUpdatePartner from '../components/modals/ModalCreateUpdatePartner';

function PartnersScreen({ navigation }) {
  const { appData, updateAppData } = useContext(AppContext);
  const { colors } = useTheme();

  const [currentPartner, setCurrentPartner] = useState(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = getPartners({});
  const { mutate: deletePartnerMutation } = deletePartner();

  const buildSocialNetworkArray = ({ item }) => {
    console.log('renderComputationg');

    let networks = [];
    if (item.facebook) {
      networks.push({
        iconName: 'logo-facebook',
        url: item.facebook,
        iconColor: 'blue',
      });
    }
    if (item.instagram) {
      networks.push({
        iconName: 'logo-instagram',
        url: `https://www.instagram.com/${item.instagram}`,
        iconColor: 'blue',
      });
    }
    if (item.youtube) {
      networks.push({
        iconName: 'logo-youtube',
        url: item.youtube,
        iconColor: 'blue',
      });
    }
    if (item.twitter) {
      networks.push({
        iconName: 'logo-twitter',
        url: item.twitter,
        iconColor: 'blue',
      });
    }

    return networks;
  };

  return (
    <ScreenContainer>
      <Header title="PARTNERS" navigation={navigation} />
      <FlatList
        refreshControl={
          <RefreshControl tintColor={colors.text} refreshing={isLoading} onRefresh={refetch} />
        }
        paddingHorizontal={12}
        numColumns={2}
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                marginVertical: 12,
                paddingHorizontal: 12,
              }}
            >
              <View>
                <Card
                  title={item.name}
                  subtitle={item.description}
                  imgUrl={item.profilePictureUrl}
                  networks={buildSocialNetworkArray({ item })}
                  websiteUrl={item.websiteUrl}
                  onPress={() => {
                    setIsPartnerModalOpen(true);
                    setCurrentPartner(item);
                  }}
                />
              </View>
              <Button
                title="Delete"
                onPress={() => {
                  deletePartnerMutation({ partnerId: item.id });
                }}
              />
            </View>
          );
        }}
      />
      <Button
        title="Create partner"
        onPress={() => {
          setIsPartnerModalOpen(true);
        }}
      />

      <ModalCreateUpdatePartner
        partner={currentPartner}
        numberOfPartners={data?.length}
        isOpen={isPartnerModalOpen}
        onClose={() => {
          setIsPartnerModalOpen(false);
        }}
      />
    </ScreenContainer>
  );
}

export default PartnersScreen;
