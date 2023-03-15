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

export const StyledInterest = styled.View`
    display: flex;
    width: auto;
    padding: 0 5px;
    min-height: 50px;
    margin: 10px 5px;
    background-color: ${({isActive})=>(isActive? "orange":"skyblue")};
    opacity: 0.8;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    position: relative;
    border: solid 3px white;
    
`

export const StyledSave = styled.View`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
    height: 50px;
    /* padding-bottom: 15px; */
    left: 0;
    right: 0;
    bottom: 80px;
    background-color: orange;
`