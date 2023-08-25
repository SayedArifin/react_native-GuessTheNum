import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNum, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNum);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNum) ||
      (direction === "greater" && currentGuess > userNum)
    ) {
      Alert.alert("Don't Lie!", "You know that is is wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandNum);
  }
  useEffect(() => {
    if (currentGuess === userNum) {
      onGameOver();
    }
  }, [currentGuess, userNum, onGameOver]);
  return (
    <View style={styles.screen}>
      <Title title={"Oponent's Guess"} />
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            +
          </PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 50,
  },
});
