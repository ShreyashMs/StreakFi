import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Habits() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Habit List</Text>

      <View style={styles.habit}>
        <Text style={styles.name}>🏃 Run</Text>
        <Text style={styles.xp}>+20 XP</Text>
      </View>

      <View style={styles.habit}>
        <Text style={styles.name}>📚 Study</Text>
        <Text style={styles.xp}>+15 XP</Text>
      </View>

      <View style={styles.habit}>
        <Text style={styles.name}>💧 Drink Water</Text>
        <Text style={styles.xp}>+5 XP</Text>
      </View>

      <Pressable style={styles.add}>
        <Text style={styles.addText}>+ Add Habit</Text>
      </Pressable>
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
  habit:{
    backgroundColor:"#fff",
    padding:18,
    borderRadius:16,
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:12
  },
  name:{
    fontSize:16,
    fontWeight:"600"
  },
  xp:{
    color:"#7B61FF"
  },
  add:{
    marginTop:20,
    backgroundColor:"#7B61FF",
    padding:16,
    borderRadius:20,
    alignItems:"center"
  },
  addText:{
    color:"#fff",
    fontWeight:"600"
  }
})