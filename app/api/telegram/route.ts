import { NextResponse } from 'next/server';

interface TelegramMessage {
    message: {
        text: string;
        chat: {
            id: number;
        };
        from: {
            id: number;
        };
    };
}

interface TelegramChatMember {
    ok: boolean;
    result: {
        status: 'member' | 'administrator' | 'creator' | 'left' | 'kicked';
    };
}

// Handle POST requests
export async function POST(req: Request) {
    try {
        const body: TelegramMessage = await req.json();

        const { message } = body;

        if (message?.text === '/start') {
            const chatId = message.chat.id;
            const userId = message.from.id;

            // Check if the user is in the channel
            const isInChannel = await checkUserInChannel(userId);
            console.log('User is in channel:', isInChannel);
            if (isInChannel) {
                await sendMessage(chatId, {
                    text: "Launch the app 🚀",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Open Web App',
                                    web_app: {
                                        url: 'https://rebankofficial.vercel.app/',
                                    }
                                }
                            ]
                        ]
                    }
                });
            } else {
                await sendMessage(chatId, {
                    text: "You're not in the channel. Access the app by joining the channel!",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Join Channel',
                                    url: process.env.TELEGRAM_CHANNEL_LINK // Replace with your channel URL
                                }
                            ]
                        ]
                    }
                });
            }
        }

        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error('Error during Telegram webhook:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Function to check if user is in a specific channel
async function checkUserInChannel(userId: number): Promise<boolean> {
    const channelId = process.env.TELEGRAM_CHANNEL_ID;
    const botToken = process.env.BOT_TOKEN;

    if (!channelId || !botToken) {
        throw new Error('TELEGRAM_CHANNEL_ID or BOT_TOKEN is not defined in environment variables.');
    }

    const url = `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${channelId}&user_id=${userId}`;
    const response = await fetch(url);
    const data: TelegramChatMember = await response.json();
    console.log(data);

    return data.ok && ['member', 'administrator', 'creator'].includes(data.result.status);
}

// Function to send a message to a chat
async function sendMessage(chatId: number, { text, reply_markup }: { text: string; reply_markup?: any }): Promise<void> {
    const botToken = process.env.BOT_TOKEN;

    if (!botToken) {
        throw new Error('BOT_TOKEN is not defined in environment variables.');
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            reply_markup: reply_markup
        }),
    });
}
