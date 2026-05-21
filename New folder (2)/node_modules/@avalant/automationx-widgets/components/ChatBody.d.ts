import { Message, MessageStyle } from './ChatMessage';
export interface ChatBodyProps {
    isMinimized: boolean;
    loading: boolean;
    avatar?: string;
    messages: Message[];
    userMessageStyle: MessageStyle;
    botMessageStyle: MessageStyle;
}
export declare const ChatBody: React.FC<ChatBodyProps>;
