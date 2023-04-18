import styled from 'styled-components/native';
import { View } from 'react-native';

export const ScreenContainer = styled(View)`
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
