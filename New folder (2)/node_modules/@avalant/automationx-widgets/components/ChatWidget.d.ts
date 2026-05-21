import { default as React } from 'react';
export interface ThemeOptions {
    headerColor?: string;
    headerTextColor?: string;
    backgroundColor?: string;
    userMessageColor?: string;
    userMessageTextColor?: string;
    botMessageColor?: string;
    botMessageTextColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    inputBorderColor?: string;
}
export interface PositionOptions {
    vertical: 'bottom' | 'top';
    horizontal: 'right' | 'left';
    offsetX?: number;
    offsetY?: number;
}
export declare const defaultTheme: ThemeOptions;
export interface ChatWidgetProps {
    webhookUrl: string;
    title?: string;
    welcomeMessage?: string;
    theme?: ThemeOptions;
    icon?: string | React.ReactNode;
    position?: PositionOptions;
    avatar?: string;
}
export declare const ChatWidget: React.FC<ChatWidgetProps>;
