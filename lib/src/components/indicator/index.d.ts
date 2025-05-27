import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { IndicatorProps } from '../../types';
interface IndicatorState {
    progress: Animated.Value;
    hideAnimation: Animated.Value;
}
export default class Indicator extends PureComponent<IndicatorProps, IndicatorState> {
    static defaultProps: Partial<IndicatorProps>;
    private animationState;
    private savedValue;
    constructor(props: IndicatorProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IndicatorProps): void;
    private startAnimation;
    private stopAnimation;
    private saveAnimation;
    private resumeAnimation;
    private renderComponent;
    render(): React.ReactElement;
}
export {};
