import * as Notifications from "expo-notifications";

export const scheduleHabitReminder = async (
  title: string,
  time: Date
) => {
  try {

    const triggerDate = new Date();
    triggerDate.setHours(time.getHours());
    triggerDate.setMinutes(time.getMinutes());
    triggerDate.setSeconds(0);

    // if time already passed today → schedule tomorrow
    if (triggerDate <= new Date()) {
      triggerDate.setDate(triggerDate.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Habit Reminder ⏰",
        body: `Time to complete: ${title}`,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });

  } catch (error) {
    console.log("Notification error:", error);
  }
};
export const registerForPushNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    alert("Permission required for notifications");
    return;
  }
};