import {gestures} from 'data/gestures';
import {mockResponse} from 'apis/base';

export const getGestureList = () => mockResponse(gestures);

export const getGestureById = (id) => mockResponse(gestures.find((g) => g.id === id));
