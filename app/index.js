import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getWidthPercentage, getHeightPercentage } from "../helpers/common";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../constants/theme";

const WelcomeScreen = () => {
  const router = useRouter();
  const goToHome = React.useCallback(() => {
    router.push("/home");
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image
        source={require("../assets/images/welcome1.png")}
        resizeMode="cover"
        style={styles.background}
      />

      {/* Linear gradient */}
      <Animated.View
        entering={FadeInDown.duration(1000)}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          width: getWidthPercentage(100),
          height: getHeightPercentage(100),
        }}
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
      </Animated.View>

      {/* content*/}
      <View style={styles.contentContainer}>
        <Animated.Text
          entering={FadeInDown.delay(400).springify()}
          style={styles.title}
        >
          Pixels
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(400).springify()}
          style={styles.punchline}
        >
          Every pixel tells a story
        </Animated.Text>
        <Animated.View entering={FadeInDown.delay(600).springify()}>
          <Pressable style={styles.startButton} onPress={goToHome}>
            <Text style={styles.startButtonText}>Start Explore</Text>
          </Pressable>
        </Animated.View>
      </View>
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
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
    flex: 1,
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
  },
  startButtonText: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: getHeightPercentage(2),
    letterSpacing: 1,
  },
});
export default WelcomeScreen;
