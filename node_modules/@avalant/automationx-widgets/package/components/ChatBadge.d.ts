export interface ChatBadgeProps {
    mode: 'bubble' | 'pill';
    icon?: string | React.ReactNode;
    title?: string;
    isMinimized: boolean;
    onMinimizeToggle: () => unknown;
}
export declare const ChatBadge: React.FC<ChatBadgeProps>;
