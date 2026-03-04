import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">This app will win the Hackathon</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">What This App Have</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
// ElementHEX CodePreview / DescriptionPrimary Action (Purple/Blue)#7000FFThe bold purple used for the "Get Started" and "Connect Phantom/Solfare" buttons.Flame/Streak Primary (Orange)#FF8800The core orange in the fire graphic and streak counts.Flame/Streak Secondary (Yellow)#FFBF00The inner yellow glow of the fire.Completed Task (Vibrant Teal)#00DDBBUsed for the + add buttons and completion checkmarks in the navigation.Leaderboard Ring Gold (1st Place)#FFD700The gold ring around the top user's profile picture.Text (On Light Backgrounds)#000000Pure black or very dark grey for maximum readability.Text (On Dark Backgrounds)#FFFFFFPure white for max readability on dark backgrounds.2. Light Mode System ColorsThis palette defines the backgrounds, containers, and borders for the Light Mode screens shown in the prototype.ElementHEX CodePreview / DescriptionApp Background#F5F5F5The very light grey background of the screens.Container Background#FFFFFFThe pure white used for cards, lists, and main content blocks.Primary Container Background#F1EDFFThe soft lavender background used in the app headers and key sections (e.g., in the Leaderboard detail).Secondary Container Background#FFE4CCThe light beige/orange container background used for other key sections (e.g., in the Booster list).Soft Border / Divider#E0E0E0Subtler grey for list dividers and container outlines.Input / Search Background#F0F0F0Light grey background for the search inputs.3. Dark Mode System ColorsThis palette defines the dark backgrounds, containers, and borders for the Dark Mode screens.ElementHEX CodePreview / DescriptionApp Background (Master)#0C0C14The very dark background color of the entire app interface.Container Background (Level 1)#1C1C26The primary dark grey background for main cards and list items.Container Background (Level 2)#292936A slightly lighter dark grey for elevated sections and nested containers.Header / Focus Background#14141EA specific dark tone used for screen headers and focus states.Input / Search Background#20202BThe dark grey background for inputs.Border / Divider#323242A darker, subtle grey for outlines and line dividers.