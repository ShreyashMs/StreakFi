# StreakFi Mobile App

StreakFi is a **Web3 habit tracking mobile application** built with **Expo, React Native, and Expo Router**.
The app helps users build streaks, earn XP, activate boosters, and earn NFT rewards while integrating with **Solana wallets**.

---

# 🚀 Features

### 🔥 Habit Streak Tracking

Users can create and track habits while maintaining daily streaks.

### ⚡ XP Reward System

Completing habits increases user XP which contributes to progress and achievements.

### 🚀 Booster System

Users can activate boosters to accelerate XP or streak rewards.

### 🎨 NFT Rewards (Planned)

Users earn NFT rewards for maintaining long streaks.

### 🔐 Wallet Authentication

Users connect a **Solana wallet** to authenticate and interact with Web3 features.

---

# 📱 App Navigation Flow

```text
index.tsx
      ↓
Wallet Connected?

YES
 ↓
Tabs Navigation
(Home / Streaks / Create / Boosters / Profile)

NO
 ↓
Onboarding
 ↓
Intro
 ↓
Wallet Connect
 ↓
Login
 ↓
Home
```

---

# 🧭 Navigation System

The project uses **Expo Router** with route groups:

* **(auth)** → Authentication & onboarding flow
* **(tabs)** → Main tab navigation
* **(main)** → Additional authenticated screens

---

# 📂 Project Structure

```text
app
 ├ (auth)
 │   ├ intro.tsx
 │   ├ login.tsx
 │   ├ onboarding.tsx
 │   └ wallet.tsx
 │
 ├ (main)
 │   └ AllHabits.tsx
 │
 ├ (tabs)
 │   ├ _layout.tsx
 │   ├ home.tsx
 │   ├ streaks.tsx
 │   ├ boosters.tsx
 │   ├ create.tsx
 │   └ profile.tsx
 │
 ├ _layout.tsx
 ├ index.tsx
 └ habits.tsx

components
 ├ connectWalletButton.tsx
 ├ habitCard.tsx
 ├ HabitHeatmap.tsx
 ├ parallax-scroll-view.tsx
 ├ StatCard.tsx
 └ themed components

hooks
 ├ use-color-scheme.ts
 ├ use-theme-color.ts
 └ useHabits.ts

services
 ├ authServices.ts
 ├ getHabits.ts
 ├ prefabricates.ts
 ├ habitServices.ts
 ├ jupiterService.ts
 ├ notificationService.ts
 ├ solanaWallet.ts
 ├ tokenRewardService.ts
 └ userService.ts

stores
 └ userStore.ts

utils
 └ helper utilities
```

---

# 🛠 Tech Stack

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React Native | Mobile UI framework           |
| Expo         | Development platform          |
| Expo Router  | File-based navigation         |
| TypeScript   | Type safety                   |
| Solana Web3  | Blockchain integration        |
| Jupiter API  | Token swap & DeFi integration |

---

# ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ShreyashMs/StreakFi.git
```

### 2️⃣ Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

### 3️⃣ Run the project

```bash
npx expo start
```

Then open using:

* **Expo Go (Android / iOS)**
* **Android Emulator**
* **iOS Simulator**

---

# 🧩 Key Components

### HabitCard

Displays habit information and progress.

### StatCard

Shows dashboard statistics such as XP, streaks, and boosters.

### HabitHeatmap

Visual representation of habit completion over time.

### ConnectWalletButton

Handles Solana wallet connection.

---

# 🔐 Wallet Integration

The app supports **Solana wallet authentication** through:

* Phantom Wallet
* Solflare Wallet

Wallet connection logic is handled inside:

```text
services/solanaWallet.ts
```

---

# 🔮 Future Improvements

* NFT minting for long streaks
* Booster marketplace
* Leaderboard system
* Social habit tracking
* Token reward distribution
* Push notifications for streak reminders

---

# 🧪 Development

Start the development server:

```bash
npm run start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

---

# 📄 License

MIT License

---

# 👨‍💻 Contributors

Developed by the StreakFi team.

---

# ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.

