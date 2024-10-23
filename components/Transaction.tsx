'use client'
import { useRouter } from 'next/navigation'

interface TransactionProps {
  type: string;
  status: string;
  amount: string;
  imgSrc: string;
}
const Transaction: React.FC<TransactionProps> = ({
  type,
  status,
  amount,
  imgSrc,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/coming-soon')}
      className="flex gap-10 justify-between items-center py-1 mt-4 w-full">
      <div className="flex gap-2 items-center self-stretch my-auto w-[182px]">
        <div
          className={`flex overflow-hidden flex-col justify-center items-center self-stretch px-1 my-auto w-10 h-10 bg-purple-500 min-h-[40px] rounded-[1000px]`}
        >
          <img
            loading="lazy"
            src={imgSrc}
            className="object-contain aspect-[1.06] w-[18px]"
            alt=""
          />
        </div>
        <div className="flex flex-col self-stretch my-auto font-medium tracking-tight leading-none whitespace-nowrap w-[102px]">
          <div className="text-base text-black">{type}</div>
          <div className="mt-2 text-sm text-slate-400">{status}</div>
        </div>
      </div>
      <div className="self-stretch my-auto text-base font-medium tracking-tight leading-none text-black">
        {amount}
      </div>
    </div>
  );
};

export default Transaction;
