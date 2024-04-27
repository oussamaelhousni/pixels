import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { getHeightPercentage, getWidthPercentage } from "../../helpers/common";
import { debounce } from "lodash";
import { theme } from "../../constants/theme";
import Categories from "../../components/Categories";
import ImagesGrid from "../../components/ImagesGrid";
import { apiCall } from "../../api";

let page = 1;
const index = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [images, setImages] = useState([]);
  const searchBarRef = useRef(null);
  const handleChangeCategory = useCallback((category) => {
    clearSearch();
    setActiveCategory(category);
    page = 1;
    const params = {
      page,
    };
    if (category) params.category = category.toLowerCase();

    fetchImages(params, false);
  }, []);

  const handleSearch = useCallback((text) => {
    setSearchText(text);
    setActiveCategory(null);
    if (text.length > 2) {
      page = 1;
      fetchImages({ page: 2, q: text });
    } else if (text === "") {
      setImages([]);
      fetchImages({ page: 1 });
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchText("");
    searchBarRef.current?.clear();
    handleSearch("");
  }, []);

  /*   const handleSearchDebounce = useCallback(debounce(handleSearch, 500), []); */

  const fetchImages = useCallback(
    debounce(async (params, append = false) => {
      return;
      const data = await apiCall(params);
      if (data.success && data.data.hits?.length > 0) {
        if (append) {
          setImages([...images, ...data.data.hits]);
        } else {
          setImages([...data.data.hits]);
        }
      }
      console.log("data", data);
    }, 500),
    []
  );

  useEffect(() => {
    fetchImages({ page: 3 });
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
            ref={searchBarRef}
            onChangeText={(value) => handleSearch(value)}
          />
          {searchText && (
            <Pressable style={styles.closeIcon} onPressOut={clearSearch}>
              <Ionicons name="close" size={24} />
            </Pressable>
          )}
        </View>
        {/* End of Search Bar*/}

        {/* start of Category*/}
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
        {/* end of Category*/}

        <View>{images && <ImagesGrid images={images} />}</View>
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
