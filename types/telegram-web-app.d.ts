interface TelegramWebApp {
    initData: string;
    initDataUnsafe: any;
    expand(): void;
    ready(): void;
}

interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}
