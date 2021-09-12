import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../../theme/colors";
import { Text } from "../../../../../app_components/typography/text.component";


export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;
export const AuthInput = styled(TextInput)`
  width: 260px;
  height: 60px;
  background-color: white;
`;
export const Title = styled(Text)`
  font-size: 30px;
  color: green;
`;
export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;