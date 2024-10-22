import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/utils/session';
import clientPromise from '@/lib/mongodb';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';
const TELEGRAM_FILE_URL = 'https://api.telegram.org/file/bot';

async function fetchTelegramAvatarFile(userId: string, botToken: string): Promise<Buffer> {
    const telegramApiUrl = `${TELEGRAM_API_URL}${botToken}/getUserProfilePhotos?user_id=${userId}`;

    const response = await fetch(telegramApiUrl);
    console.log(response)
    const data = await response.json();
    console.log(data)
    if (data.ok && data.result.photos.length > 0) {
        const photoArray = data.result.photos[0];
        const avatarFileId = photoArray[photoArray.length - 1].file_id;

        const fileResponse = await fetch(`${TELEGRAM_API_URL}${botToken}/getFile?file_id=${avatarFileId}`);
        const fileData = await fileResponse.json();

        if (fileData.ok) {
            const filePath = fileData.result.file_path;
            const imageUrl = `${TELEGRAM_FILE_URL}${botToken}/${filePath}`;

            const imageResponse = await fetch(imageUrl);
            if (!imageResponse.ok) {
                throw new Error('Error fetching avatar image');
            }
            console.log(imageResponse)
            return Buffer.from(await imageResponse.arrayBuffer());
        } else {
            throw new Error('Error fetching file path');
        }
    }

    throw new Error('Avatar not found');
}

export async function GET(request: NextRequest) {
    const session = await getSession();
    console.log(session)
    if (!session || !session.user.telegramId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('Cluster83535');
        const collection = db.collection('users');
        const botToken = process.env.BOT_TOKEN;

        if (!botToken) {
            throw new Error('Bot token is not set');
        }

        const avatarFile = await fetchTelegramAvatarFile(session.user.telegramId, botToken);

        await collection.updateOne(
            { telegramId: session.user.telegramId },
            { $set: { avatar: avatarFile } },
            { upsert: true }
        );

        return new NextResponse(avatarFile, {
            headers: {
                'Content-Type': 'image/png', // Adjust based on the image type
                'Content-Disposition': 'inline; filename="avatar.png"', // Adjust filename if needed
            },
        });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
