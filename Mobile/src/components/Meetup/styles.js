import styled from 'styled-components/native';

import Button from '../Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Card = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 15px;
`;
export const Banner = styled.Image`
  width: 100%;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;
export const Details = styled.View`
  padding: 0 20px;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;
export const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding-top: 10px;
`;
export const Txt = styled.Text`
  color: #999;
  font-size: 14px;
  padding-left: 5px;
`;
export const SubmitButton = styled(Button).attrs(props => ({
  enabled: !props.past,
}))`
  margin: 20px 0;
  opacity: ${props => (props.past ? 0.6 : 1)};
`;
