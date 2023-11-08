import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { TouchableOpacity, View, Image, FlatList, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';

import Text from '../components/Text';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Header from '../components/Header';
import CardRitual from '../components/CardRitual';
import HorizontalList from '../components/HorizontalList';

import { ScreenContainer } from '../layout';

import { AppContext } from '../contexts/appContext';
import { getRitualSkeletons, deleteRitualSkeleton } from '../hooks/queries/ritualSkeleton';
import { getRituals } from '../hooks/queries/ritual';
import { getRitualCategories } from '../hooks/queries/ritualCategory';
import { generateDatesArray } from '../utils/date';

import images from '../assets';

const DayItem = ({ index, dayNumber, dayString, isActive, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        onPress({ index });
      }}
      style={{
        borderWidth: 0,
        height: 100,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text isBold marginBottom={8} style={{ borderWidth: 0 }}>
        {dayString}
      </Text>
      <View
        style={{
          borderWidth: isActive ? 2 : 0,
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
          borderColor: colors.info,
        }}
      >
        <Text isBold>{dayNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

const RitualCategoryItem = ({ isActive, categoryId, image, name, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        onPress({ categoryId });
      }}
      style={{
        borderWidth: isActive ? 1 : 0,
        width: 50,
        height: 50,
        borderRadius: 12,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: isActive ? colors.borderColor : null,
        backgroundColor: isActive ? colors.lightBackground : colors.background,
      }}
    >
      <Image source={image} style={{ width: 30, height: 30 }} resizeMode="contain" />
      <Text size="small" marginTop={8}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

function RitualsScreen({ navigation }) {
  const { appData, updateAppData } = useContext(AppContext);
  const { colors } = useTheme();

  const [activeDayItem, setActiveDayItem] = useState({
    dayNumber: moment().format('D'),
    dayString: moment().format('ddd'),
    formattedDate: moment().format('YYYY-MM-DD'),
  });

  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const dateItems = generateDatesArray();

  const {
    data: ritualSkeletonsData,
    isLoading: ritualSkeletonsIsLoading,
    refetch: refetchRitualSkeletons,
  } = getRitualSkeletons({});

  const {
    data: ritualsData,
    isLoading: ritualsIsLoading,
    refetch: refetchRituals,
  } = getRituals({
    day: activeDayItem.formattedDate,
  });

  const { mutate: deleteRitualMutation } = deleteRitualSkeleton();
  const { data: ritualCategories } = getRitualCategories({});

  const dayItems = dateItems.map((item, index) => {
    return {
      id: index,

      component: () => {
        return (
          <DayItem
            index={index}
            isActive={activeDayItem.formattedDate === item.formattedDate}
            dayNumber={item.dayNumber}
            dayString={item.dayString.toUpperCase()}
            onPress={() => {
              setActiveDayItem(item);
            }}
          />
        );
      },
    };
  });

  useEffect(() => {
    refetchRituals({ day: activeDayItem.formattedDate });
  }, [activeDayItem]);

  const categoryItems = ritualCategories?.map((item) => {
    return {
      id: item.id,
      component: () => {
        return (
          <View style={{ marginRight: 12 }}>
            <RitualCategoryItem
              categoryId={item.id}
              image={images[item?.pictureName]}
              name={item.name}
              isActive={activeCategoryId === item.id}
              onPress={({ categoryId }) => {
                setActiveCategoryId(categoryId);
              }}
            />
          </View>
        );
      },

      image: images[item.pictureName],
    };
  });

  if (ritualSkeletonsIsLoading || !ritualSkeletonsData) {
    return <Loader />;
  }

  return (
    <ScreenContainer>
      <Header title="RITUALS" navigation={navigation} />
      <View style={{ borderWidth: 0 }}>
        <HorizontalList height={100} items={dayItems} />
      </View>

      {/* <HorizontalList height={100} items={categoryItems} /> */}

      <FlatList
        style={{ borderWidth: 0 }}
        refreshControl={
          <RefreshControl
            tintColor={colors.text}
            refreshing={ritualSkeletonsIsLoading}
            onRefresh={refetchRituals}
          />
        }
        renderItem={({ item }) => {
          return (
            <CardRitual
              navigation={navigation}
              ritual={item}
              onPress={() => {
                navigation.navigate('RitualScreen', { ritualIdParam: item.id });
              }}
            />
          );
        }}
        data={ritualsData}
      />

      {/* <FlatList
        refreshControl={
          <RefreshControl
            tintColor={colors.text}
            refreshing={ritualSkeletonsIsLoading}
            onRefresh={refetchRitualSkeletons}
          />
        }
        renderItem={({ item }) => {
          return (
            <View key={item.id} style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RitualScreen', { ritualIdParam: item.id });
                }}
                style={{
                  height: 60,
                  width: 120,
                  borderWidth: 1,
                  borderRadius: 8,
                  marginHorizontal: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Text isBold>{item.name}</Text>
                <Text>{item?.ritualCategory?.name}</Text>
              </TouchableOpacity>

              <Button
                width={100}
                title="Delete"
                onPress={() => {
                  deleteRitualMutation({ ritualSkeletonId: item.id });
                }}
              />
            </View>
          );
        }}
        data={ritualSkeletonsData}
      /> */}
    </ScreenContainer>
  );
}

export default RitualsScreen;
