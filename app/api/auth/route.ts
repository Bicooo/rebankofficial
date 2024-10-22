import { NextResponse } from 'next/server'
import { validateTelegramWebAppData } from '@/utils/telegramAuth'
import { cookies } from 'next/headers'
import { encrypt, SESSION_DURATION } from '@/utils/session'
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
    const { initData } = await request.json()
    console.log(initData)

    const validationResult = validateTelegramWebAppData(initData)
    if (validationResult.validatedData) {
        const user = {
            telegramId: validationResult.user.id,
            firstName: validationResult.user.first_name,
            lastName: validationResult.user.last_name,
            username: validationResult.user.username,
            languageCode: validationResult.user.language_code,
            allowsWriteToPm: validationResult.user.allows_write_to_pm
        }

        try {
            const client = await clientPromise
            const db = client.db('Cluster83535')
            const collection = db.collection('users')

            const existingUser = await collection.findOne({ telegramId: user.telegramId })

            if (!existingUser) {
                await collection.insertOne(user)
            }

            const expires = new Date(Date.now() + SESSION_DURATION)
            const session = await encrypt({ user: {
                telegramId: user.telegramId,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                languageCode: user.languageCode,
                allowsWriteToPm: user.allowsWriteToPm
            }, expires })

            cookies().set('session', session, { expires, httpOnly: true })

            return NextResponse.json({ message: 'Authentication successful' })
        } catch (error) {
            console.error('Error accessing MongoDB:', error)
            return NextResponse.json({ message: 'Error saving user to database' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ message: validationResult.message }, { status: 401 })
    }
}
