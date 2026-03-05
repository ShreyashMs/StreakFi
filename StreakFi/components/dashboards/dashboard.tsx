import { ScrollView, Text, View } from "react-native";
import Card from "../ui/card";
import FlameStreak from "../ui/FlameStreak";
import FloatingActionButton from "../ui/FloatingActionButton";
import GradientHeader from "../ui/GradientHeader";
import NFTRewardCard from "../ui/NFTCard";
import XPProgressBar from "../ui/XPProgressBar";

export default function Dashboard() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6FB" }}>
      <GradientHeader title="StreakFi" />

      <ScrollView style={{ padding: 20 }}>

        <Card>
          <Text style={{ fontWeight: "600" }}>Current Streak</Text>
          <FlameStreak count={5} />
        </Card>

        <Card>
          <Text style={{ fontWeight: "600" }}>Daily XP</Text>
          <XPProgressBar progress={0.7} />
        </Card>

        <Card>
          <Text style={{ fontWeight: "600", marginBottom: 12 }}>
            NFT Rewards
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <NFTRewardCard title="Flame NFT" />
            <NFTRewardCard title="Legend NFT" />
            <NFTRewardCard title="Gold NFT" />
          </ScrollView>
        </Card>

      </ScrollView>

      <FloatingActionButton />

    </View>
  );
}