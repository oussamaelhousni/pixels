import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import { categories } from "../constants/data";
import { getWidthPercentage } from "../helpers/common";
import { theme } from "../constants/theme";
export default function Categories({ activeCategory, handleChangeCategory }) {
  return (
    <FlatList
      data={categories}
      horizontal={true}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Category
          value={item}
          index={index}
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
          activeCategory={activeCategory}
        />
      )}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
    />
  );
}

function Category({ value, index, isActive, handleChangeCategory }) {
  const color = !isActive ? theme.colors.neutral(0.5) : theme.colors.black;
  const backgroundColor = !isActive ? theme.colors.grayBG : theme.colors.white;
  return (
    <Animated.View
      style={[styles.category, { backgroundColor }]}
      entering={FadeInRight.delay(100 * index)}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={() => handleChangeCategory(isActive ? null : value)}
      >
        <Text style={{ color }}>{value}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: getWidthPercentage(4),
    gap: 15,
  },
  category: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
  },
});
