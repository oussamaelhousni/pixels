import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const getWidthPercentage = (percentage) => {
  return (percentage * width) / 100;
};

export const getHeightPercentage = (percentage) => {
  return (percentage * height) / 100;
};

export const getColumns = () => {
  if (width >= 1024) {
    return 4;
  }
  if (width > 786) {
    return 3;
  }
  return 2;
};

export const getImageHeight = (width, height) => {
  if (width > height) {
    return 250;
  } else if (width < height) {
    return 300;
  }
  return 200;
};
