import { StyleSheet } from "react-native";
import styled from "styled-components";
export const ProfileStyled = StyleSheet.create({
    ProfileTitle: {
        display: "flex",
        position: "relative",
        marginVertical: 10,
        marginHorizontal: 20,
        height: 30,
        width: "auto",
    },
})


export const StyldWebView = styled.View`
        display: flex;
        position: relative;
        height:${(props) => props.height-289}px;
`
        
export const ProfileButton = styled.View`
    position: relative;
    height: 50px;
    border: solid 1px;
`