'use client';
import { useRouter } from 'next/navigation'

const ComingSoonPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center p-[60px_16px] gap-[24px] h-[100vh] bg-[#FAF7F7]">
            {/* Image */}
            <div
                className="w-[284px] h-[284px] bg-cover bg-center"
                style={{ backgroundImage: 'url(coming-soon.png)', mixBlendMode: 'darken' }}
            />

            {/* Frame 47 */}
            <div className="flex flex-col items-center p-0 gap-[16px] w-[358px]">
                {/* Frame 36 */}
                <div className="flex flex-col items-center p-0 gap-[16px] w-[358px] h-[35px]">
                    {/* Coming Soon Text */}
                    <span className="text-[#000000] text-[32px] font-[600] leading-[35px] text-center font-poppins">
                        Coming Soon
                    </span>
                </div>

                {/* Frame 41 */}
                <div className="flex flex-row items-center justify-center p-0 gap-[16px] w-[358px] h-[24px]">
                    {/* Notification Text */}
                    <span className="text-[#000000] text-[14px] font-[500] leading-[24px] text-center opacity-[0.4] font-poppins">
                        We will notify you when this feature will be live.
                    </span>
                </div>
            </div>

            {/* Frame 40 */}
            <div className="flex flex-col items-center p-[0px_16px] gap-[24px] w-[390px] h-[110px]">
                {/* Frame 39 */}
                <div className="flex flex-row justify-center items-center p-[10px] gap-[10px] w-[358px] h-[60px] bg-[#B05BDA] rounded-full">
                    {/* Got It Button */}
                    <button
                        onClick={() => router.push('/homepage')}
                        className="text-[#FFFFFF] text-[16px] font-[500] leading-[24px] font-poppins"
                    >
                        Got It
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonPage;
