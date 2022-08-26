export interface DialogDataInterface<T = void> {
    title?: string;
    content?: any;
    contentData?: T;
    cancelText?: string;
    confirmText?: string;
    width?: string;
    disableClose?: boolean;
    data?: any;
}
