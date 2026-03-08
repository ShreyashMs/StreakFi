import { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";

export default function XPAnimation({ xp }: { xp: number }) {

  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(20)).current;

  useEffect(() => {

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: -30,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {

      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        delay: 500,
        useNativeDriver: true
      }).start();

    });

  }, []);

  return (

    <Animated.View
      style={{
        opacity,
        transform: [{ translateY: translate }],
        position: "absolute",
        top: 20,
        alignSelf: "center",
      }}
    >

      <Text style={{ color: "#22c55e", fontSize: 18 }}>
        +{xp} XP
      </Text>

    </Animated.View>

  );

}