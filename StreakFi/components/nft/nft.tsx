import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function NFTPage() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>NFT Rewards</Text>

      <View style={styles.card}>
        <Text style={styles.name}>🔥 Streak Flame</Text>
        <Text>Reward for 7 day streak</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>🏆 Champion NFT</Text>
        <Text>Reward for 30 day streak</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F6F6FB",
    padding:20
  },
  title:{
    fontSize:24,
    fontWeight:"700",
    marginBottom:20
  },
  card:{
    backgroundColor:"#fff",
    padding:20,
    borderRadius:16,
    marginBottom:12
  },
  name:{
    fontSize:18,
    fontWeight:"600"
  }
})