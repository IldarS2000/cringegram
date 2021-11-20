import React, {FC, ReactNode} from "react";
import {StyleSheet, View} from "react-native";

interface Props {
    children: ReactNode;
}

export const CommentsPane: FC<Props> = ({ children }: Props): JSX.Element => {
    return (
        <View style={styles.commentsPane}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    commentsPane: {
        width: '100%',
        flexGrow: 1,
        padding: 20,
        justifyContent: 'flex-start',
        position: 'relative',
    },
});