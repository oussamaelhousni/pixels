import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const getWidthPercentage = (percentage) => {
  return (percentage * width) / 100;
};

export const getHeightPercentage = (percentage) => {
  return (percentage * height) / 100;
};
