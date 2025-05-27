"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const indicator_1 = __importDefault(require("../indicator"));
const styles_1 = __importDefault(require("./styles"));
class BarIndicator extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.renderComponent = ({ index, count, progress, }) => {
            const { color: backgroundColor = "rgb(0, 0, 0)", size = 40, animationDuration = 1200, } = this.props;
            const frames = (60 * animationDuration) / 1000;
            let samples = 0;
            do
                samples += count;
            while (samples < frames);
            const inputRange = Array.from(new Array(samples + 1), (item, index) => index / samples);
            const width = Math.floor(size / 5), height = Math.floor(size / 2), radius = Math.ceil(width / 2);
            const containerStyle = {
                height: size,
                width: width,
                marginHorizontal: radius,
            };
            const topStyle = {
                width,
                height,
                backgroundColor,
                borderTopLeftRadius: radius,
                borderTopRightRadius: radius,
                transform: [
                    {
                        translateY: progress.interpolate({
                            inputRange,
                            outputRange: this.outputRange(+(height - radius) / 2, index, count, samples),
                        }),
                    },
                ],
            };
            const bottomStyle = {
                width,
                height,
                backgroundColor,
                borderBottomLeftRadius: radius,
                borderBottomRightRadius: radius,
                transform: [
                    {
                        translateY: progress.interpolate({
                            inputRange,
                            outputRange: this.outputRange(-(height - radius) / 2, index, count, samples),
                        }),
                    },
                ],
            };
            return (<react_native_1.View style={containerStyle} key={index}>
        <react_native_1.Animated.View style={topStyle}/>
        <react_native_1.Animated.View style={bottomStyle}/>
      </react_native_1.View>);
        };
        this.renderComponent = this.renderComponent.bind(this);
    }
    outputRange(base, index, count, samples) {
        const range = Array.from(new Array(samples), (item, index) => base * Math.abs(Math.cos((Math.PI * index) / (samples - 1))));
        for (let j = 0; j < index * (samples / count); j++) {
            range.unshift(range.pop());
        }
        range.unshift(...range.slice(-1));
        return range;
    }
    render() {
        const _a = this.props, { style } = _a, props = __rest(_a, ["style"]);
        return (<indicator_1.default style={[styles_1.default.container, style]} renderComponent={this.renderComponent} {...props}/>);
    }
}
BarIndicator.defaultProps = {
    count: 3,
    color: "rgb(0, 0, 0)",
    size: 40,
};
exports.default = BarIndicator;
