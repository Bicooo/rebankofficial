'use client'
import { useRouter } from 'next/navigation'
import Transaction from "./Transaction";

interface TransactionData {
  type: string;
  status: string;
  amount: string;
  imgSrc: string;
}

const transactions: TransactionData[] = [
  {
    type: "Reward",
    status: "Pending",
    amount: "+1 000 RFI",
    imgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c0688d6ac391bf16f747f6426a1673c17c8f5e860167bca9458fed9ecfbbbe70?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a",
  },
];

const TransactionList: React.FC = () => {
  const router = useRouter();

  return (
    <section className="h-[35vh] px-5">
      <header className="flex gap-10 justify-between items-start py-3 w-full font-medium tracking-tight leading-none items-end">
        <h2 className="text-xl text-black">Recent Transactions</h2>
        <a href="#" onClick={() => router.push('/coming-soon')} className="text-base text-purple-500">
          See All
        </a>
      </header>
      {transactions.map((transaction, index) => (
        <Transaction
          key={index}
          type={transaction.type}
          status={transaction.status}
          amount={transaction.amount}
          imgSrc={transaction.imgSrc}
        />
      ))}
    </section>
  );
};

export default TransactionList;
