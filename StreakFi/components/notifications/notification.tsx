import { StyleSheet, Text, View } from "react-native";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <Text>🔥 Don't forget your daily habit!</Text>
      <Text>🏆 You unlocked a new NFT!</Text>
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