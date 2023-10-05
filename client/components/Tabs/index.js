import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useTheme } from 'styled-components/native';

import Text from '../Text';

const Tabs = ({ config, activeIndex, isLazy = false }) => {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);

  const [routes] = useState(config);

  const renderScene = useCallback(({ route }) => {
    return <View style={{ flex: 1 }}>{route.component}</View>;
  }, []);

  useEffect(() => {
    if (activeIndex) {
      setIndex(activeIndex);
    }
  }, [activeIndex]);

  const renderLabels = useCallback(
    ({ route, focused }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 0,
            // borderWidth: 1,
          }}
        >
          <Text textColor={focused ? colors.text : colors.textSecondary}>
            {route.title}{' '}
            <Text isBold>
              {route.key === 'all' || !route?.amount ? null : `· ${route?.amount}`}
            </Text>
          </Text>
        </View>
      );
    },
    [colors],
  );

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        renderLabel={({ route, focused, color }) => renderLabels({ route, focused, color })}
        indicatorStyle={{
          backgroundColor: colors.background,
          borderBottomWidth: 2,
          borderBottomColor: colors.primary,
        }}
        labelStyle={{
          fontFamily: 'Montserrat_400Regular',
          textTransform: 'none',
        }}
        style={{
          backgroundColor: colors.bakcground,
          marginBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderColor,
        }}
      />
    );
  };

  const layout = useWindowDimensions();

  return (
    <TabView
      lazy={isLazy}
      style={{ height: config[index].height }}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Tabs;
