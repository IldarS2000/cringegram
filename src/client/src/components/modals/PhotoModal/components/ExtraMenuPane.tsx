import React, {FC} from "react";
import {StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View} from "react-native";
import {Color} from "../../../../constants/colors";
import {Fonts} from "../../../../constants/fonts";
import {Button} from "../../../UI/Button/Button";
import {format, parseISO} from "date-fns";

interface Props {
    postDateISO?: string;
    onDeletePress: () => void;
    onEditPress: () => void;
    onMenuClosePress: () => void;
}

export const ExtraMenuPane: FC<Props> = ({ postDateISO, onDeletePress, onEditPress, onMenuClosePress }: Props): JSX.Element => {
    const {height} = useWindowDimensions();
    return (
        <View style={{
            ...styles.descriptionWrapper,
            height: height - 360,
        }}>
            <TouchableWithoutFeedback onPress={onMenuClosePress}>
                <View style={{
                    ...styles.extraBackground,
                    height: '100%'
                }} />
            </TouchableWithoutFeedback>
            <View style={{
                ...styles.extraMenuWrapper,
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={styles.extraMenu}>
                    <Button text='Edit' onPress={onEditPress} />
                    <Button
                        text='Delete'
                        primaryColor={Color.ORANGE300}
                        secondaryColor={Color.ORANGE100}
                        onPress={onDeletePress}
                    />
                </View>
                <Text style={styles.date}>
                    {postDateISO && format(parseISO(postDateISO), 'dd MMMM yyyy')}, Cringe
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    extraMenuWrapper: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    extraMenu: {
        width: '90%',
        zIndex: 3,
        height: 140,
        borderRadius: 30,
        backgroundColor: Color.BLUE100,
        marginTop: 65,
        borderWidth: 2,
        borderColor: Color.BLACK500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        alignItems: 'center',
        elevation: 15,
    },
    extraBackground: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 2,
    },
    descriptionWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    date: {
        ...Fonts.description,
        fontSize: 15,
        lineHeight: 18,
        color: Color.BLACK300,
        marginBottom: 25,
    },
});