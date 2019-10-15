import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;

  padding: 0 30px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 30px 0;
`;
export const HeaderButton = styled.TouchableOpacity``;
export const HeaderDate = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin-bottom: 15px;
  border-radius: 4px;
`;

export const EmptyList = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;
export const EmptyText = styled.Text`
  color: #fff;
  font-size: 22px;
  text-align: center;
  margin: 20px 0;
`;
