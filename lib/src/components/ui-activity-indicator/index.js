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
import React, { PureComponent } from "react";
import { View, Animated } from "react-native";
import Indicator from "../indicator";
import styles from "./styles";
class UIActivityIndicator extends PureComponent {
    constructor(props) {
        super(props);
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 40, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;
            const angle = (index * 360) / count;
            const layerStyle = {
                transform: [
                    {
                        rotate: angle + "deg",
                    },
                ],
            };
            const inputRange = Array.from(new Array(count + 1), (item, index) => index / count);
            const outputRange = Array.from(new Array(count), (item, index) => Math.max(1.0 - index * (1 / (count - 1)), 0));
            for (let j = 0; j < index; j++) {
                const lastItem = outputRange.pop();
                if (lastItem !== undefined) {
                    outputRange.unshift(lastItem);
                }
            }
            outputRange.unshift(...outputRange.slice(-1));
            const barStyle = {
                width: size / 10,
                height: size / 4,
                borderRadius: size / 20,
                backgroundColor,
                opacity: progress.interpolate({ inputRange, outputRange }),
            };
            return (<Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={barStyle}/>
      </Animated.View>);
        };
        this.renderComponent = this.renderComponent.bind(this);
    }
    render() {
        const _a = this.props, { style, size: width = 40, size: height = 40 } = _a, props = __rest(_a, ["style", "size", "size"]);
        return (<View style={[styles.container, style]}>
        <Indicator style={{ width, height }} renderComponent={this.renderComponent} {...props}/>
      </View>);
    }
}
UIActivityIndicator.defaultProps = {
    color: "rgb(0, 0, 0)",
    count: 12,
    size: 40,
};
export default UIActivityIndicator;
