import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/utils/session';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    const session = await getSession();

    if (!session || !session.user || !session.user.telegramId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('Cluster83535');
        const collection = db.collection('users');

        const { country } = await request.json();
        if (!country || !country.name || !country.code) {
            return NextResponse.json({ error: 'Country data is incomplete' }, { status: 400 });
        }

        await collection.updateOne(
            { telegramId: session.user.telegramId },
            { $set: { country: country } },
            { upsert: true }
        );

        return NextResponse.json({ success: true, message: 'Country updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
