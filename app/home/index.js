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
import FiltersModal from "../../components/FiltersModal";

let page = 1;
const index = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [filters, setFilters] = useState(null);
  const [images, setImages] = useState([]);
  const [isEndReached, setIsEndReached] = useState(false);
  const searchBarRef = useRef(null);
  const modalRef = useRef(null);
  const scrollViewRef = useRef(null);

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

  const handleOpenModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const handleCloseModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const applyFilters = useCallback(() => {
    if (filters) {
      page = 1;
      let params = { ...filters };
      setImages([]);
      if (activeCategory) params.category = activeCategory;
      if (searchText) params.q = searchText;
      console.log("fetch params", params);
      fetchImages(params);
    }
    handleCloseModal();
  }, [filters, activeCategory, searchText]);

  const resetFilters = useCallback(() => {
    console.log("resetting filters");
    let params = {
      page: 1,
    };
    setImages([]);
    setFilters(null);
    if (setSearchText) params.q = searchText;
    if (activeCategory) params.category = activeCategory;
    fetchImages(params);
    handleCloseModal();
  }, [searchText, activeCategory]);
  /*   const handleSearchDebounce = useCallback(debounce(handleSearch, 500), []); */

  const fetchImages = useCallback(
    debounce(async (params, append = false) => {
      console.log("append", append);
      const data = await apiCall(params);

      if (data.success && data.data.hits?.length > 0) {
        if (append) {
          console.log("apeending", images.length || 4);
          setImages([...images, ...data.data.hits]);
        } else {
          console.log("here");
          setImages([...data.data.hits]);
        }
      }
    }, 500),
    [images, setImages]
  );

  const scrollTop = useCallback(() => {
    scrollViewRef.current.scrollTo({
      top: 0,
      animate: true,
    });
  }, []);

  const onScroll = useCallback(
    (event) => {
      const { contentOffset, layoutMeasurement, contentSize } =
        event.nativeEvent;
      const bottomPosition = contentSize.height - layoutMeasurement.height;
      if (bottomPosition - 10 < contentOffset.y) {
        if (!isEndReached) {
          setIsEndReached(true);
          ++page;
          let params = {
            page,
            ...filters,
          };

          if (activeCategory) params.category = activeCategory;
          if (searchText) params.q = searchText;

          fetchImages(params, true);
        }
      } else if (isEndReached) {
        setIsEndReached(false);
      }
    },
    [isEndReached, activeCategory, searchText, filters, images]
  );

  useEffect(() => {
    fetchImages({ page: 1 });
  }, []);

  useEffect(() => {
    console.log("currentFilters", filters);
  }, [filters]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={scrollTop}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>

        <Pressable onPress={handleOpenModal}>
          <FontAwesome6 name="bars-staggered" size={22} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 15 }}
        scrollEventThrottle={5}
        ref={scrollViewRef}
        onScroll={onScroll}
      >
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
        <Text style={{ textAlign: "center" }}>Loading</Text>
      </ScrollView>

      {/* Filter Modal */}
      <FiltersModal
        modalRef={modalRef}
        filters={filters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        setFilters={setFilters}
      />
      {/* End of filter Modal*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
