import {SubsType} from "../enums/subs.enum";

export const subsTypes = {
    [SubsType.SUBSCRIPTIONS]: 'Подписки',
    [SubsType.SUBSCRIBERS]: 'Подписчики',
};

export const formatSubsType = (subsType: SubsType) => subsTypes[subsType];