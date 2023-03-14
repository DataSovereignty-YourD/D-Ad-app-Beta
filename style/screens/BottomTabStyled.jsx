import { StyleSheet } from "react-native";

export const BottomTabStyled = StyleSheet.create({
    Layout: {
        display: "flex",
          position: "absolute",
          backgroundColor: "white",
          borderWidth: "1px",
          borderTopWidth: "1px",
          borderTopColor: "black",
          borderColor: "black",
          height: 80,
          left: 0,
          right: 0,
          bottom: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
          overflow:"visible",
    }
})