import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Boosters() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Boosters</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Basic Booster</Text>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Apply</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>XP Booster</Text>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Apply</Text>
        </Pressable>
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
    marginBottom:12,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  name:{
    fontSize:16,
    fontWeight:"600"
  },
  btn:{
    backgroundColor:"#7B61FF",
    paddingVertical:8,
    paddingHorizontal:18,
    borderRadius:12
  },
  btnText:{
    color:"#fff"
  }
})