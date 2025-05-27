var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
class Indicator extends PureComponent {
    constructor(props) {
        super(props);
        this.animationState = 0;
        this.savedValue = 0;
        this.startAnimation = () => {
            const { progress } = this.state;
            const { interaction, animationEasing, animationDuration } = this.props;
            if (0 !== this.animationState) {
                return;
            }
            const animation = Animated.timing(progress, {
                duration: animationDuration || 1200,
                easing: animationEasing || Easing.linear,
                useNativeDriver: true,
                isInteraction: interaction,
                toValue: 1,
            });
            Animated.loop(animation).start();
            this.animationState = 1;
        };
        this.stopAnimation = () => {
            const { progress } = this.state;
            if (1 !== this.animationState) {
                return;
            }
            const listener = progress.addListener(({ value }) => {
                progress.removeListener(listener);
                progress.stopAnimation(() => this.saveAnimation(value));
            });
            this.animationState = -1;
        };
        this.saveAnimation = (value) => {
            const { animating } = this.props;
            this.savedValue = value;
            this.animationState = 0;
            if (animating) {
                this.resumeAnimation();
            }
        };
        this.resumeAnimation = () => {
            const { progress } = this.state;
            const { interaction, animationDuration } = this.props;
            if (0 !== this.animationState) {
                return;
            }
            Animated.timing(progress, {
                useNativeDriver: true,
                isInteraction: interaction,
                duration: (1 - this.savedValue) * (animationDuration || 1200),
                toValue: 1,
            }).start(({ finished }) => {
                if (finished) {
                    progress.setValue(0);
                    this.animationState = 0;
                    this.startAnimation();
                }
            });
            this.savedValue = 0;
            this.animationState = 1;
        };
        this.renderComponent = (_item, index) => {
            const { progress } = this.state;
            const { renderComponent, count } = this.props;
            if (typeof renderComponent === 'function') {
                return renderComponent({ index, count: count || 1, progress });
            }
            return null;
        };
        /*
         *  0 -> 1
         *    | startAnimation
         *    | resumeAnimation
         *
         *  1 -> -1
         *    | stopAnimation
         *
         * -1 -> 0
         *    | saveAnimation
         */
        this.animationState = 0;
        this.savedValue = 0;
        const { animating } = this.props;
        this.state = {
            progress: new Animated.Value(0),
            hideAnimation: new Animated.Value(animating ? 1 : 0),
        };
    }
    componentDidMount() {
        const { animating } = this.props;
        if (animating) {
            this.startAnimation();
        }
    }
    componentDidUpdate(prevProps) {
        const { animating } = this.props;
        if (animating && !prevProps.animating) {
            this.resumeAnimation();
        }
        if (!animating && prevProps.animating) {
            this.stopAnimation();
        }
        if (animating !== prevProps.animating) {
            const { hideAnimation } = this.state;
            const { hideAnimationDuration: duration } = this.props;
            Animated.timing(hideAnimation, {
                toValue: animating ? 1 : 0,
                duration: duration || 200,
                useNativeDriver: false,
            }).start();
        }
    }
    render() {
        const { hideAnimation } = this.state;
        const _a = this.props, { count, hidesWhenStopped } = _a, props = __rest(_a, ["count", "hidesWhenStopped"]);
        let style = props.style;
        if (hidesWhenStopped) {
            style = [
                ...(Array.isArray(props.style) ? props.style : [props.style]),
                { opacity: hideAnimation },
            ];
        }
        return (<Animated.View {...props} style={style}>
        {Array.from(new Array(count || 1), this.renderComponent)}
      </Animated.View>);
    }
}
Indicator.defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    hideAnimationDuration: 200,
    animating: true,
    interaction: true,
    hidesWhenStopped: true,
    count: 1,
};
export default Indicator;
