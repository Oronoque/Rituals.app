import styled from 'styled-components/native';
import { View, SafeAreaView } from 'react-native';

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(p) => p.theme.colors.background};
`;

export const CenteredContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled(CenteredContainer)``;
