'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from "@/components/Card";
import CardSmall from "@/components/CardSmall";
import ActionButton from "@/components/ActionButton";
import Navbar from "@/components/Navbar";
import Reward from "@/components/Reward";
import TransactionList from "@/components/TransactionList";

const Homepage: React.FC = () => {
    const router = useRouter();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [iframeUrl, setIframeUrl] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAvatar() {
            try {
                const response = await fetch('/api/user-avatar');
                if (!response.ok) {
                    throw new Error('');
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setAvatarUrl(url);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchAvatar();
    }, []);

    const handleFetchIframeUrl = async () => {
        try {
            const response = await fetch('/api/offramp'); // Adjust this path to your API
            if (!response.ok) {
                throw new Error('Failed to fetch iframe URL');
            }
            const data = await response.json();
            setIframeUrl(data.url); // Assuming the API returns { url: "iframe_url" }
        } catch (error) {
            console.error(error);
            setIframeUrl(null);
        }
    };

    return (
        <div className="flex flex-col max-w-[512px] h-[100vh] bg-white">
            <header className="flex flex-col py-2.5 pl-4">
                <div className="flex gap-10 justify-between items-center w-full">
                    {loading ? (
                        <div className="w-11 aspect-square bg-gray-300 rounded-full animate-pulse" />
                    ) : error ? (
                        <div className="w-11 aspect-square bg-gray-300 rounded-full">
                            <p className="text-center text-red-500">{error}</p>
                        </div>
                    ) : avatarUrl ? (
                        <img
                            loading="lazy"
                            src={avatarUrl}
                            className="object-contain shrink-0 self-stretch my-auto w-11 aspect-square rounded-full"
                            alt="Profile"
                            onClick={() => router.push('/coming-soon')}
                        />
                    ) : (
                        <div className="w-11 aspect-square bg-gray-300 rounded-full" />
                    )}
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6aa6f235db794d780b96cc643afde4b50c3480539f29d045723b1bc7daa7725a?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                        className="object-contain shrink-0 self-stretch my-auto aspect-[5.81] w-[116px]"
                        alt="Logo"
                    />
                    <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch px-1 py-3 my-auto w-11 min-h-[40px]">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/00aa356a616615db8ad75fa4f11df64090dee1281ba783e71823a1c8d4fd725e?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                            className="object-contain self-stretch my-auto w-4 aspect-[0.89]"
                            alt=""
                            onClick={() => router.push('/coming-soon')}
                        />
                    </div>
                </div>
            </header>

            <Reward />

            <section className="flex flex-row gap-1 items-center self-start mt-6 w-[100%] justify-between">
                <Card
                    cardNumber="**** 8766"
                    validThru="06/28"
                    backgroundImg="https://cdn.builder.io/api/v1/image/assets/TEMP/40c72ccacc9eb0638eb637ecf03ab0bda3cf4932012eb95c702309ff42a31e92?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                    logoImg="https://cdn.builder.io/api/v1/image/assets/TEMP/79331d215e14f71771e259f7983ebd295b792662482d91df419666254989f9ff?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                    additionalLogo="https://cdn.builder.io/api/v1/image/assets/TEMP/15184e8337b99a650c34935e996bffec81d25bed838ec9a15f3f1dcbf79c6712?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                />
                <CardSmall
                    cardNumber="**** 2766"
                    validThru="06/28"
                    backgroundImg="https://cdn.builder.io/api/v1/image/assets/TEMP/c5c1cc50ef1f5f208cbeb411c46513c57e25d782e23a5c0edb4bc758f2778b92?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                    logoImg="https://cdn.builder.io/api/v1/image/assets/TEMP/79331d215e14f71771e259f7983ebd295b792662482d91df419666254989f9ff?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                />
            </section>

            <section className="flex gap-1 items-start mt-6 w-full px-5">
                <ActionButton
                    text="Send"
                    imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/5167f5a01437ff3c7bb24a092aa91754daa635c8783b9e0b434bba602fc10b6a?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                    bgColor="bg-indigo-100"
                    textColor="text-black"
                />
                <ActionButton
                    text="Exchange"
                    imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/b2013954e5283e1eeb2878504c63414d869efdaa4bb9e93d2e86f1f4d6ded08e?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                    bgColor="bg-fuchsia-200"
                    textColor="text-black"
                    onClick={handleFetchIframeUrl} // Add the onClick to fetch iframe URL
                />
                <button onClick={() => router.push('/coming-soon')}
                    className="flex gap-2.5 justify-center items-center px-2.5 bg-gray-100 h-[60px] min-h-[60px] rounded-[1000px] w-[60px]">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/94a34f18f502ee66038f42b7d6f4f201b52894095f4e680719540462d97f73ab?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
                        className="object-contain self-stretch my-auto w-6 aspect-square"
                        alt=""
                    />
                </button>
            </section>

            {iframeUrl && (
                <div className="flex justify-center mt-6">
                    <iframe
                        src={iframeUrl}
                        allow="fullscreen"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            border: 'none',
                            zIndex: 9999, // Ensure it appears on top of other content
                        }}
                    ></iframe>
                </div>
            )}

            <TransactionList />

            <Navbar />
        </div>
    );
};

export default Homepage;
``
