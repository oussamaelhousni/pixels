import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { getHeightPercentage, getWidthPercentage } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Categories from "../../components/Categories";

const index = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const handleChangeCategory = useCallback((category) => {
    setActiveCategory(category);
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>

        <Pressable>
          <FontAwesome6 name="bars-staggered" size={22} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* Start of Search Bar*/}
        <View style={styles.searchBar}>
          <Pressable style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.9)}
            />
          </Pressable>
          <TextInput
            placeholder="Search for photos..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={(value) => setSearchText(value)}
          />
          {searchText && (
            <Pressable style={styles.closeIcon}>
              <Ionicons name="close" size={24} />
            </Pressable>
          )}
        </View>
        {/* End of Search Bar*/}
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: getWidthPercentage(4),
    paddingTop: 10,
  },
  title: {
    fontSize: getHeightPercentage(4),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.neutral(0.9),
  },

  searchBar: {
    backgroundColor: theme.colors.white,
    marginHorizontal: getWidthPercentage(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: theme.radius.md,
  },
  searchIcon: {
    padding: 5,
  },
  searchInput: {
    flex: 1,
  },
  closeIcon: {
    backgroundColor: theme.colors.grayBG,
    padding: 5,
    borderRadius: theme.radius.xs,
  },
});

export default index;
