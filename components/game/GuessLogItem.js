import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const GuessLogItem = ({ roundNum, guess }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNum}</Text>
      <Text style={styles.itemText}>Oponent's Guess: {guess}</Text>
    </View>
  );
};

export default GuessLogItem;
const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary700,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
