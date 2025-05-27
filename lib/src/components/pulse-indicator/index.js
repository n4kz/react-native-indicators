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
class PulseIndicator extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 40, color = 'rgb(0, 0, 0)' } = this.props;
            const pulseStyle = {
                height: size,
                width: size,
                borderRadius: size / 2,
                backgroundColor: color,
                transform: [
                    {
                        scale: progress.interpolate({
                            inputRange: [0, 0.67, 1],
                            outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0],
                        }),
                    },
                ],
                opacity: progress.interpolate({
                    inputRange: [0, 0.67, 1],
                    outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0],
                }),
            };
            return (<react_native_1.Animated.View style={styles_1.default.layer} key={index}>
        <react_native_1.Animated.View style={pulseStyle}/>
      </react_native_1.Animated.View>);
        };
        this.renderComponent = this.renderComponent.bind(this);
    }
    render() {
        const _a = this.props, { style, size = 40 } = _a, props = __rest(_a, ["style", "size"]);
        const width = size;
        const height = size;
        return (<react_native_1.View style={[styles_1.default.container, style]}>
        <indicator_1.default style={{ width, height }} renderComponent={this.renderComponent} {...props} count={2}/>
      </react_native_1.View>);
    }
}
PulseIndicator.defaultProps = {
    animationEasing: react_native_1.Easing.out(react_native_1.Easing.ease),
    color: 'rgb(0, 0, 0)',
    size: 40,
};
exports.default = PulseIndicator;
