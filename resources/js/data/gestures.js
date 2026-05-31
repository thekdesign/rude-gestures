import {finger} from './gestures/finger';
import {double} from './gestures/double';
import {palm} from './gestures/palm';
import {thumb} from './gestures/thumb';
import {arm} from './gestures/arm';
import {face} from './gestures/face';

export const gestures = [
    ...finger,
    ...double,
    ...palm,
    ...thumb,
    ...arm,
    ...face,
];
