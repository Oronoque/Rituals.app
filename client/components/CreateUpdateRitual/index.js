import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { useTheme } from 'styled-components/native';

import Text from '../Text';
import Button from '../Button';

import { createRitual } from '../../hooks/queries/ritual';

const CreateUpdateRitual = () => {
  const { colors } = useTheme();

  const [ritualName, setRitualName] = useState('');

  const { mutate: createRitualMutation } = createRitual();

  return (
    <View>
      <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Text size="big" isBold>
          Add your ritual
        </Text>
      </View>
      <Input
        placeholder="Type your ritual name"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        value={ritualName}
        label="Ritual name"
        inputStyle={{
          color: colors.text,
          fontSize: 18,
        }}
        onChangeText={(value) => {
          setRitualName(value);
        }}
      />
      <View style={{ alignSelf: 'center' }}>
        <Button
          title="Add"
          isDisabled={!ritualName}
          onPress={() => {
            createRitualMutation({
              name: ritualName,
            });
          }}
        />
      </View>
    </View>
  );
};

export default CreateUpdateRitual;
