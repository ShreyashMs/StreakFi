import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text>Name: User</Text>
      <Text>Current Streak: 5</Text>
      <Text>Total XP: 320</Text>
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