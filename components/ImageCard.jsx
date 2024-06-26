import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import {
  getHeightPercentage,
  getWidthPercentage,
  getImageHeight,
} from "../helpers/common";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export default function ImageCard({ item, columns, index }) {
  const { imageWidth: width, imageHeight: height } = item;
  const isLastColumn = (index + 1) % columns !== 0;
  const router = useRouter();
  return (
    <Pressable
      style={[styles.imageWrapper, isLastColumn && styles.spacing]}
      onPress={() => {
        console.log("open modal");
        router.push({
          pathname: "/home/image",
          params: { ...item },
        });
      }}
    >
      <Image
        source={{ uri: item?.webformatURL }}
        transition={1000}
        style={[styles.image, { height: getImageHeight(width, height) }]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    marginBottom: getHeightPercentage(2),
    borderRadius: theme.radius.xl,
    overflow: "hidden",
  },
  spacing: {
    marginRight: getWidthPercentage(2),
  },
});
