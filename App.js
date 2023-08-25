import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
export default function App() {
  const [userNum, setUserNum] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  const [fontLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontLoaded) {
    SplashScreen.hideAsync();
  }
  function pickedNumberHandler(pickedNumber) {
    setUserNum(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler(numberOfRound) {
    setGameIsOver(true);
    setGuessRounds(numberOfRound);
  }

  function onStartNewGame() {
    setUserNum(null);
    setGuessRounds(0);
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onPickNum={pickedNumberHandler} />;

  if (userNum) {
    screen = <GameScreen userNum={userNum} onGameOver={gameOverHandler} />;
  }
  if (gameIsOver && userNum) {
    screen = (
      <GameOverScreen
        userNumber={userNum}
        roundsNumber={guessRounds}
        onStartNewGame={onStartNewGame}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.bacgroundImage}
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  bacgroundImage: {
    opacity: 0.15,
  },
});
