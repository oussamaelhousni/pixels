import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { getColumns, getWidthPercentage } from "../helpers/common";
const ImagesGrid = ({ images }) => {
  const columns = useMemo(() => getColumns(), []);
  return (
    <View style={styles.container}>
      <MasonryFlashList
        contentContainerStyle={styles.imagesGrid}
        data={images}
        numColumns={columns}
        initialNumberToRender={1000}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} columns={columns} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 300,
    width: getWidthPercentage(100),
    paddingHorizontal: getWidthPercentage(4),
  },
  imagesGrid: {},
});
export default ImagesGrid;
