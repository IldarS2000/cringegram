import React, {FC} from "react";
import {StyleSheet, TextInput, TouchableWithoutFeedback, useWindowDimensions, View} from "react-native";
import EditIcon from "../../../../images/edit.svg";
import {Color} from "../../../../constants/colors";
import {Fonts} from "../../../../constants/fonts";

interface Props {
    description: string;
    onChangeDescription: (description: string) => void;
    onEditConfirm: () => void;
}

export const EditModePane: FC<Props> = ({ description, onChangeDescription, onEditConfirm }: Props): JSX.Element => {
    const {height} = useWindowDimensions();
    return (
        <>
            <TouchableWithoutFeedback>
                <View style={{
                    ...styles.textWrapper,
                    maxHeight: height - 360
                }}>
                    <TextInput
                        multiline
                        style={styles.text}
                        maxLength={128}
                        onChangeText={onChangeDescription}
                        value={description}
                    />
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onEditConfirm}>
                <View style={styles.buttonEdit}>
                    <EditIcon fill={Color.BLUE200} height={43} width={43} />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    textWrapper: {
        width: '100%',
        flexGrow: 1,
        padding: 20,
        justifyContent: 'flex-start',
        position: 'relative',
    },
    text: {
        ...Fonts.description,
        height: '100%',
        width: '100%',
        backgroundColor: Color.BLUE100,
        borderRadius: 10,
        borderColor: Color.BLACK500,
        borderWidth: 3,
        padding: 20,
        paddingBottom: 40,
        textAlignVertical: 'top',
    },
    buttonEdit: {
        backgroundColor: Color.WHITE,
        width: 86,
        height: 86,
        borderRadius: 100,
        borderColor: Color.BLACK500,
        borderWidth: 3,
        position: 'absolute',
        bottom: 15,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
});