import { NextResponse } from 'next/server';

type OfframpResponse = {
    url?: string;
    [key: string]: unknown;
};

export async function GET() {
    try {
        const response = await fetch('https://onramp-api.vercel.app/create-offramp', {
            method: 'POST',
        });
        console.log(response)

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data: OfframpResponse = await response.json();

        if (data.url) {
            return NextResponse.json({ url: data.url }, { status: 200 });
        } else {
            throw new Error('URL not found in the response');
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
