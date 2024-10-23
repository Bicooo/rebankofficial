'use client'
import { useRouter } from 'next/navigation'

const Reward: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex gap-6 items-end py-3 mt-6 w-full px-5">
      <div className="flex flex-col flex-1 shrink tracking-tight leading-none text-black basis-0 min-w-[240px]">
        <div className="text-sm font-medium">Claim Reward</div>
        <div className="mt-3 text-5xl font-semibold">
          <span className="text-4xl">1 000.00</span>{" "}
          <span className="text-3xl text-neutral-300">RFI</span>
        </div>
      </div>
      <div className="flex gap-2.5 items-center pb-2 w-[60px]">
        <div onClick={() => router.push('/coming-soon')} className="flex gap-2.5 justify-center items-center self-stretch px-2.5 my-auto bg-emerald-100 h-[60px] min-h-[60px] rounded-[1000px] w-[60px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a75574f12b30573f7f28bc5a498f3199d5c62066938ce53aef3bb91ca24f5889?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
            className="object-contain self-stretch my-auto w-6 aspect-square"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Reward;
