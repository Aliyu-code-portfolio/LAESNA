import styled from "styled-components/native";
import { Button, TextInput, Text } from "react-native-paper";
import { colors } from "../../theme/colors";


export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/bgimg1.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;
export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;
export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;