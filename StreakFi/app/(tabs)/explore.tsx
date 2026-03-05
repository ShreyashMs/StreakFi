

import { Pressable, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
   <View style={styles.container}>
      <ThemedText type="title">Explore</ThemedText>

      <Pressable onPress={() => router.push("/dashboard")}>
        <ThemedText>Dashboard</ThemedText>
      </Pressable>

      <Pressable onPress={() => router.push("/habits")}>
        <ThemedText>Habits</ThemedText>
      </Pressable>

      <Pressable onPress={() => router.push("/leaderboard")}>
        <ThemedText>Leaderboard</ThemedText>
      </Pressable>

      <Pressable onPress={() => router.push("/wallet")}>
        <ThemedText>Wallet</ThemedText>
      </Pressable>

      <Pressable onPress={() => router.push("/profile")}>
        <ThemedText>Profile</ThemedText>
      </Pressable>
    </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
   container: {
    flex: 1,
    padding: 25,
    gap: 20,
  },
  link: {
    fontSize: 18,
  },
});
