import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';

import Modal from '../../Modal';
import Text from '../../Text';
import Button from '../../Button';
import Input from '../../Input';

import { showToast } from '../../../utils/toast';

import { createPartner, updatePartner } from '../../../hooks/queries/partner';

const ModalCreateUpdatePartner = ({ partner, isOpen, onClose, numberOfPartners = 0 }) => {
  const { colors } = useTheme();

  const { mutate: createPartnerMutation, isSuccess: isSuccessCreate } = createPartner();
  const { mutate: updatePartnerMutation, isSuccess: isSuccessUpdate } = updatePartner();

  const [partnerConfig, setPartnerConfig] = useState([
    {
      key: 'order',
      placeholder: 'Partner order',
      value: partner ? partner.order : (numberOfPartners + 1).toString(),
    },
    {
      key: 'name',
      placeholder: 'Partner name',
      value: partner?.name || '',
    },
    {
      key: 'description',
      placeholder: 'Partner description',
      value: partner?.description || '',
    },
    {
      key: 'email',
      placeholder: 'Partner email',
      value: partner?.email || '',
    },
    {
      key: 'youtube',
      placeholder: 'Partner youtube',
      value: partner?.youtube || '',
    },
    {
      key: 'facebook',
      placeholder: 'Partner facebook',
      value: partner?.facebook || '',
    },
    {
      key: 'twitter',
      placeholder: 'Partner twitter',
      value: partner?.twitter || '',
    },
    {
      key: 'instagram',
      placeholder: 'Partner instagram',
      value: partner?.instagram || '',
    },

    {
      key: 'websiteUrl',
      placeholder: 'Partner websiteUrl',
      value: partner?.websiteUrl || '',
    },
  ]);

  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate) {
      showToast({ title: `Partner ${partner ? 'edited' : 'created'}` });

      onClose();
    }
  }, [isSuccessCreate, isSuccessUpdate]);

  return (
    <Modal height="90%" isOpen={isOpen} onClose={onClose}>
      <ScrollView>
        <View style={{ padding: 12, borderWidth: 0 }}>
          <Text size="big" textAlign="center" isBold marginBottom={12}>
            {partner ? 'Update partner' : 'Create a new partner'}
          </Text>
        </View>

        {partnerConfig.map((item, index) => {
          return (
            <View key={item.key} style={{ marginBottom: 24 }}>
              <Input
                value={item.value}
                placeholder={item.placeholder}
                colors={colors}
                onChange={(value) => {
                  const copyPartner = [...partnerConfig];
                  copyPartner[index].value = value;
                  setPartnerConfig(copyPartner);
                }}
              />
            </View>
          );
        })}

        <Button
          title={partner ? 'Update' : 'Create'}
          onPress={() => {
            const partnerData = partnerConfig.reduce((result, item) => {
              result[item.key] = item.value;
              return result;
            }, {});

            if (partner) {
              updatePartnerMutation({
                partnerId: partner.id,
                name: partnerData.name,
                description: partnerData.description,
                email: partnerData.email,
                youtube: partnerData.youtube,
                facebook: partnerData.facebook,
                twitter: partnerData.twitter,
                instagram: partnerData.instagram,
                order: partnerData.order,
                websiteUrl: partnerData.websiteUrl,
              });
            } else {
              createPartnerMutation({
                name: partnerData.name,
                description: partnerData.description,
                email: partnerData.email,
                youtube: partnerData.youtube,
                facebook: partnerData.facebook,
                twitter: partnerData.twitter,
                instagram: partnerData.instagram,
                order: partnerData.order,
                websiteUrl: partnerData.websiteUrl,
              });
            }
          }}
        />
      </ScrollView>
    </Modal>
  );
};

export default ModalCreateUpdatePartner;
