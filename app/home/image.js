import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { getHeightPercentage, getWidthPercentage } from "../../helpers/common";
import { theme } from "../../constants/theme";
import { Octicons } from "@expo/vector-icons";

const image = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [status, setStatus] = useState("loading");

  const fileName = params?.previewURL?.split("/").pop();
  const filePath = `${FileSystem.documentDirectory}/${fileName}`;
  const getSize = () => {
    const aspectRatio = params.imageWidth / params.imageHeight;
    const maxWidth =
      Platform.OS === "web" ? getWidthPercentage(50) : getWidthPercentage(92);
    const calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    console.log("dimesions", {
      width: calculatedWidth,
      height: calculatedWidth,
    });
    return { width: calculatedWidth, height: calculatedWidth };
  };

  const onLoad = () => {
    setStatus("");
  };

  const handleShareImage = async () => {
    setStatus("sharing");
    const uri = await downloadFile();
    if (uri) {
      await Sharing.shareAsync(uri);
    }
  };

  const handleDownloadImage = async () => {
    setStatus("downloading");
    const uri = await downloadFile();
    if (uri) {
      console.log("file downloaded", uri);
      showToast({ message: "downloaded" });
    }
  };

  const downloadFile = async () => {
    console.log(params.webformatURL, filePath);
    try {
      const { uri } = await FileSystem.downloadAsync(
        params.webformatURL,
        filePath
      );
      return uri;
    } catch (error) {
      Alert.alert("Image", error.message);
      return null;
    } finally {
      setStatus("");
    }
  };

  const showToast = ({ message }) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const toastConfig = {
    success: ({ text1, props, ...rest }) => {
      return (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{text1}</Text>
        </View>
      );
    },
  };
  return (
    <BlurView intensity={50} style={styles.container}>
      <View style={getSize()}>
        {status === "loading" && (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} color="white" />
          </View>
        )}

        <Image
          source={params.webformatURL}
          transition={100}
          style={[
            styles.image,
            {
              width: getSize().width,
              height: getSize().height,
            },
          ]}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.buttons}>
        <View>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Octicons name="x" size={24} color="white" />
          </Pressable>
        </View>

        <View>
          {status === "downloading" ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Pressable style={styles.button} onPress={handleDownloadImage}>
              <Octicons name="download" size={24} color="white" />
            </Pressable>
          )}
        </View>

        <View>
          {status === "sharing" ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Pressable style={styles.button} onPress={handleShareImage}>
              <Octicons name="share" size={24} color="white" />
            </Pressable>
          )}
        </View>
      </View>
      <Toast config={toastConfig} />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: getWidthPercentage(4),
    backgroundColor: "rgba(0,0,0,.8)",
    gap: 15,
  },

  buttonText: {
    color: "blue",
    fontSize: getHeightPercentage(2.5),
  },
  image: {
    borderRadius: theme.radius.xl,
  },
  loading: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  button: {
    height: getHeightPercentage(6),
    width: getHeightPercentage(6),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,.2)",
    borderRadius: theme.radius.xl,
  },
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,.3)",
  },
  toastText: {
    fontSize: getHeightPercentage(1.8),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.white,
  },
});

export default image;
