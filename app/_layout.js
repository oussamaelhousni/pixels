import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, statusBarColor: "black" }}
      />
      <Stack.Screen
        name="home/index"
        options={{ headerShown: false, statusBarColor: "black" }}
      />
    </Stack>
  );
};

export default _layout;
