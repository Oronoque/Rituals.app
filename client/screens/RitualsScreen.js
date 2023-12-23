import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { TouchableOpacity, View, Image, FlatList, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';

import TextComponent from '../components/TextComponent';
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
      <TextComponent isBold marginBottom={8} style={{ borderWidth: 0 }}>
        {dayString}
      </TextComponent>
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
        <TextComponent isBold>{dayNumber}</TextComponent>
      </View>
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
              image={item?.pictureName}
              name={item.name}
              isActive={activeCategoryId === item.id}
              onPress={({ categoryId }) => {
                setActiveCategoryId(categoryId);
              }}
            />
          </View>
        );
      },
    };
  });

  if (ritualSkeletonsIsLoading || !ritualSkeletonsData) {
    return <Loader />;
  }

  return (
    <ScreenContainer>
      <Header title="Rituals" navigation={navigation} />
      <View style={{ borderWidth: 0 }}>
        <HorizontalList height={100} items={dayItems} />
      </View>

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
    </ScreenContainer>
  );
}

export default RitualsScreen;
