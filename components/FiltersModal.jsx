import React, { useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "../constants/theme";
import data from "../constants/data";

import { getHeightPercentage } from "../helpers/common";

const FiltersModal = ({
  modalRef,
  filters,
  setFilters,
  applyFilters,
  resetFilters,
}) => {
  // variables
  const snapPoints = useMemo(() => ["25%", "80%"], []);

  const keys = useMemo(() => Object.keys(data.filters));
  return (
    <View style={styles.container}>
      <BottomSheetModal
        ref={modalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.filterText}>Filters</Text>
            {keys.map((key, index) => {
              return (
                <SectionView
                  title={key}
                  key={index}
                  data={data.filters[key]}
                  filters={filters}
                  setFilters={setFilters}
                />
              );
            })}

            <View style={styles.buttons}>
              <Pressable style={[styles.button]}>
                <Text style={{ textAlign: "center" }} onPress={resetFilters}>
                  Reset
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.applyButton]}
                onPress={applyFilters}
              >
                <Text
                  style={{ textAlign: "center", color: theme.colors.white }}
                >
                  Apply
                </Text>
              </Pressable>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

function CustomBackdrop({ animatedIndex, style }) {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.EXTEND
    );
    return { opacity };
  });
  return (
    <Animated.View
      style={[
        containerAnimatedStyle,
        style,
        StyleSheet.absoluteFill,
        { backgroundColor: "rgba(0,0,0,0.1)", flex: 1 },
      ]}
    >
      <BlurView
        intensity={100}
        tint="light"
        style={StyleSheet.absoluteFill}
      ></BlurView>
    </Animated.View>
  );
}

const SectionView = function ({ data, title, filters, setFilters }) {
  return (
    <View style={styles.sectionViewContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>
        {title !== "colors" ? (
          <CommonRow
            data={data}
            filterName={title}
            filters={filters}
            setFilters={setFilters}
          />
        ) : (
          <ColorsRow colors={data} filters={filters} setFilters={setFilters} />
        )}
      </View>
    </View>
  );
};

const CommonRow = ({ data, filters, filterName, setFilters }) => {
  const onSelect = useCallback((item) => {
    setFilters({ ...filters, [filterName]: item });
  });

  return (
    <View style={styles.commonRow}>
      {data.map((value, index) => {
        const isActive = filters && filters[filterName] === value;
        const backgroundColor = isActive
          ? theme.colors.neutral(0.8)
          : theme.colors.white;
        const textColor = isActive ? theme.colors.white : "black";
        return (
          <Pressable
            key={index}
            style={[styles.filterItem, { backgroundColor }]}
            onPress={() => onSelect(value)}
          >
            <Text style={[styles.filterItemText, { color: textColor }]}>
              {value}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const ColorsRow = ({ colors, setFilters, filters }) => {
  const onSelect = useCallback((item) => {
    setFilters({ ...filters, ["colors"]: item });
  });
  return (
    <View style={styles.commonRow}>
      {colors.map((color, index) => {
        const isActive = filters && color === filters["colors"];
        return (
          <Pressable
            key={index}
            style={[
              {
                height: 30,
                padding: 10,
                width: 40,
                backgroundColor: color,
                borderRadius: theme.radius.xs,
                borderColor: isActive
                  ? theme.colors.neutral(0.8)
                  : "transparent",
                borderWidth: 2,
              },
            ]}
            onPress={() => onSelect(color)}
          ></Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    gap: 15,
    width: "100%",
    paddingHorizontal: 20,
  },
  sectionViewContainer: {
    gap: 5,
  },
  filterText: {
    fontSize: getHeightPercentage(4),
    fontWeight: theme.fontWeights.semibold,
  },

  sectionTitle: {
    fontSize: getHeightPercentage(2.5),
    fontWeight: theme.fontWeights.medium,
  },

  commonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  filterItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: theme.colors.neutral(0.8),
    borderRadius: theme.radius.xs,
    borderColor: theme.colors.grayBG,
    borderWidth: 1,
  },
  filterItemText: {
    color: theme.colors.white,
  },

  buttons: {
    marginTop: 20,
    flexDirection: "row",
    gap: 15,
  },
  button: {
    flexGrow: 1,
    padding: 10,
    borderRadius: theme.radius.xs,
    textAlign: "center",
    backgroundColor: "gray",
    borderCurve: "continuous",
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.neutral(0.1),
    borderWidth: 2,
  },
  applyButton: {
    backgroundColor: theme.colors.neutral(0.8),
    color: theme.colors.white,
  },
});

export default FiltersModal;
