import React from "react";
import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack initialRouteName="home/index">
          <Stack.Screen
            name="index"
            options={{ headerShown: false, statusBarColor: "black" }}
          />
          <Stack.Screen
            name="home/index"
            options={{ headerShown: false, statusBarColor: "black" }}
          />
          <Stack.Screen
            name="home/image"
            options={{
              headerShown: false,
              statusBarColor: "black",
              presentation: "transparentModal",
              animation: "fade",
            }}
          ></Stack.Screen>
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;
