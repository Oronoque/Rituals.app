import styled from 'styled-components/native';
import { View, SafeAreaView } from 'react-native';

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  background-color: ${(p) => p.theme.colors.background};
  padding-horizontal: 20px;
`;

export const CenteredContainer = styled(View)`
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled(CenteredContainer)``;
