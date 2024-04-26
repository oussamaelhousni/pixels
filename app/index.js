import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { getWidthPercentage, getHeightPercentage } from "../helpers/common";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { theme } from "../constants/theme";
const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/images/welcome1.png")}
        resizeMode="cover"
        style={styles.background}
      />

      {/* Linear gradient */}
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
        <LinearGradient
          style={styles.gradient}
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,.5)",
            "white",
            "white",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.6 }}
        />
        {/* content*/}
        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.title}
          >
            Pixels
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(600).duration(600)}
            style={styles.punchline}
          >
            Every pixel tells a story
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).duration(600)}>
            <Pressable style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    top: 0,
    width: getWidthPercentage(100),
    height: getHeightPercentage(100),
    position: "absolute",
  },
  gradient: {
    width: getWidthPercentage(100),
    height: getHeightPercentage(65),
    position: "absolute",
    bottom: 0,
  },
  contentContainer: {
    alignItems: "center",
    gap: 14,
  },
  title: {
    fontSize: getHeightPercentage(6),
    fontWeight: theme.fontWeights.bold,
  },
  punchline: {
    fontSize: getHeightPercentage(2),
    fontWeight: theme.fontWeights.medium,
    marginBottom: 10,
    letterSpacing: 1,
  },
  startButton: {
    backgroundColor: theme.colors.neutral(0.8),
    padding: 15,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    paddingHorizontal: 90,
    marginBottom: 50,
  },
  startButtonText: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: getHeightPercentage(2),
    letterSpacing: 1,
  },
});
export default WelcomeScreen;
