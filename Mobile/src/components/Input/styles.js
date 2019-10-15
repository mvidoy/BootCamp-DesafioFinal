import styled from 'styled-components/native';

export const Container = styled.View`
  background: rgba(0, 0, 0, 0.2);
  padding: 0 15px;
  height: 50px;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
})`
  flex: 1;
  font-size: 18px;
  color: #fff;
  margin-left: 10px;
`;
