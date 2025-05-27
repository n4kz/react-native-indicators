import React from "react";
import { EasingFunction, ViewStyle, Animated } from "react-native";
export interface BaseIndicatorProps {
    animationEasing?: EasingFunction;
    animationDuration?: number;
    hideAnimationDuration?: number;
    animating?: boolean;
    interaction?: boolean;
    hidesWhenStopped?: boolean;
    style?: ViewStyle;
}
export interface IndicatorProps extends BaseIndicatorProps {
    renderComponent?: (params: {
        index: number;
        count: number;
        progress: Animated.Value;
    }) => React.ReactElement | null;
    count?: number;
}
export interface ColoredIndicatorProps extends BaseIndicatorProps {
    color?: string;
    size?: number;
}
export interface BallIndicatorProps extends ColoredIndicatorProps {
    count?: number;
}
export interface BarIndicatorProps extends ColoredIndicatorProps {
    count?: number;
}
export interface DotIndicatorProps extends ColoredIndicatorProps {
    count?: number;
}
export type MaterialIndicatorProps = ColoredIndicatorProps;
export type PacmanIndicatorProps = ColoredIndicatorProps;
export type PulseIndicatorProps = ColoredIndicatorProps;
export interface SkypeIndicatorProps extends ColoredIndicatorProps {
    count?: number;
    minScale?: number;
    maxScale?: number;
}
export interface UIActivityIndicatorProps extends ColoredIndicatorProps {
    count?: number;
}
export interface WaveIndicatorProps extends ColoredIndicatorProps {
    count?: number;
    waveFactor?: number;
    waveMode?: "fill" | "outline";
}
