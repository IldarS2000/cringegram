import {TextStyle, ViewStyle} from "react-native";

export const getStyleByCondition = (condition: boolean, style: ViewStyle | TextStyle) => {
    return condition ? style : {};
};
