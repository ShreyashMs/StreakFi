import { StyleSheet, Text, View } from "react-native";

export default function Leaderboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      <Text>🥇 Alex — 2100 XP</Text>
      <Text>🥈 Sam — 1850 XP</Text>
      <Text>🥉 You — 1600 XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:"#F6F6FB"
  },
  title:{
    fontSize:24,
    fontWeight:"700",
    marginBottom:20
  }
})