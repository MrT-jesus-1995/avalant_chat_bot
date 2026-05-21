export type Message = {
    from: 'bot' | 'user';
    text: string;
};
export type MessageStyle = {
    backgroundColor?: string;
    color?: string;
};
export interface ChatMessageProps {
    avatar?: string;
    message: Message;
    userMessageStyle: MessageStyle;
    botMessageStyle: MessageStyle;
}
export declare const ChatMessage: React.FC<ChatMessageProps>;
