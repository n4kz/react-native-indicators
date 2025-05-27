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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveIndicator = exports.UIActivityIndicator = exports.SkypeIndicator = exports.PulseIndicator = exports.PacmanIndicator = exports.MaterialIndicator = exports.DotIndicator = exports.BallIndicator = exports.BarIndicator = exports.Indicator = void 0;
const indicator_1 = __importDefault(require("./src/components/indicator"));
exports.Indicator = indicator_1.default;
const ball_indicator_1 = __importDefault(require("./src/components/ball-indicator"));
exports.BallIndicator = ball_indicator_1.default;
const bar_indicator_1 = __importDefault(require("./src/components/bar-indicator"));
exports.BarIndicator = bar_indicator_1.default;
const dot_indicator_1 = __importDefault(require("./src/components/dot-indicator"));
exports.DotIndicator = dot_indicator_1.default;
const material_indicator_1 = __importDefault(require("./src/components/material-indicator"));
exports.MaterialIndicator = material_indicator_1.default;
const pacman_indicator_1 = __importDefault(require("./src/components/pacman-indicator"));
exports.PacmanIndicator = pacman_indicator_1.default;
const pulse_indicator_1 = __importDefault(require("./src/components/pulse-indicator"));
exports.PulseIndicator = pulse_indicator_1.default;
const skype_indicator_1 = __importDefault(require("./src/components/skype-indicator"));
exports.SkypeIndicator = skype_indicator_1.default;
const ui_activity_indicator_1 = __importDefault(require("./src/components/ui-activity-indicator"));
exports.UIActivityIndicator = ui_activity_indicator_1.default;
const wave_indicator_1 = __importDefault(require("./src/components/wave-indicator"));
exports.WaveIndicator = wave_indicator_1.default;
// Export types
__exportStar(require("./src/types"), exports);
