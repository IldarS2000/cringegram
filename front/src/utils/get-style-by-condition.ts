export const getStyleByCondition = (condition: boolean, style: object) => {
    return condition ? style : {};
};
