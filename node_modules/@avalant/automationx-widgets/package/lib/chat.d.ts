import { ChatWidgetProps } from '../components/ChatWidget';
export interface ChatOptions extends ChatWidgetProps {
    parent?: HTMLElement;
}
export declare function createChat(options: ChatOptions): {
    destroy: () => void;
} | undefined;
