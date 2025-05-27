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
import Indicator from '../indicator';
import styles from './styles';
class DotIndicator extends PureComponent {
    constructor(props) {
        super(props);
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 16, color: backgroundColor = 'rgb(0, 0, 0)' } = this.props;
            const style = {
                width: size,
                height: size,
                margin: size / 2,
                borderRadius: size / 2,
                backgroundColor,
                transform: [
                    {
                        scale: progress.interpolate({
                            inputRange: [
                                0.0,
                                (index + 0.5) / (count + 1),
                                (index + 1.0) / (count + 1),
                                (index + 1.5) / (count + 1),
                                1.0,
                            ],
                            outputRange: [1.0, 1.36, 1.56, 1.06, 1.0],
                        }),
                    },
                ],
            };
            return <Animated.View style={style} {...{ key: index }}/>;
        };
        this.renderComponent = this.renderComponent.bind(this);
    }
    render() {
        const _a = this.props, { style } = _a, props = __rest(_a, ["style"]);
        return (<Indicator style={[styles.container, style]} renderComponent={this.renderComponent} {...props}/>);
    }
}
DotIndicator.defaultProps = {
    animationEasing: Easing.inOut(Easing.ease),
    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 16,
};
export default DotIndicator;
