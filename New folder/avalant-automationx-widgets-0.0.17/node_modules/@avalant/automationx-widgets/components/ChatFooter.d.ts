import { ThemeOptions } from './ChatWidget';
export type ButtonStyle = {
    backgroundColor?: string;
    color?: string;
};
export type InputStyle = {
    borderColor?: string;
};
export interface ChatFooterProps {
    isMinimized: boolean;
    loading: boolean;
    listening: boolean;
    textContent: string;
    speechContent: string;
    inputStyle: InputStyle;
    buttonStyle: ButtonStyle;
    theme: ThemeOptions;
    onSetInput: (value: string) => unknown;
    onSendMessage: () => unknown;
    onToggleSpeech: () => unknown;
}
export declare const ChatFooter: React.FC<ChatFooterProps>;
