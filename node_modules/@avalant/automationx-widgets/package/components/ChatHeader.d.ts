export type HeaderStyle = {
    backgroundColor?: string;
    color?: string;
};
export interface ChatHeaderProps {
    icon?: string | React.ReactNode;
    title?: string;
    headerStyle: HeaderStyle;
    isMinimized: boolean;
    onMinimizeToggle: () => unknown;
}
export declare const ChatHeader: React.FC<ChatHeaderProps>;
