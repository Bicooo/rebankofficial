'use client'
import { useRouter } from 'next/navigation'

const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <footer>
      <nav className="flex items-center px-6 py-4 w-full text-sm font-medium leading-none whitespace-nowrap rounded-3xl bg-stone-50 text-slate-400">
        <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto text-center text-black basis-0">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d3f1ed2a476ab7a3b42111a8af412214bf4a330ac1861d821ef714d21b3ac1b?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
            className="object-contain self-center w-6 aspect-square"
            alt="Home"
          />
          <div className="mt-2">Home</div>
        </div>
        <div
          onClick={() => router.push('/coming-soon')}
          className="flex flex-col flex-1 shrink justify-center items-center self-stretch my-auto basis-0">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d85c68a18b09ef8e83823260976c2c25d94040dffacd69e73008f23aa2a73c77?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
            className="object-contain w-6 aspect-square"
            alt="Loans"
          />
          <div className="mt-2">Loans</div>
        </div>
        <div
          onClick={() => router.push('/coming-soon')}
          className="flex flex-col flex-1 shrink justify-center items-center self-stretch my-auto basis-0">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/52e0a1b701e8dfda9081af362acf135d400abd6d0e9b53f7fd7bb85d2af57103?placeholderIfAbsent=true&apiKey=18ccfdb5083c46ed846dde897794429a"
            className="object-contain w-6 aspect-square"
            alt="Earn"
          />
          <div className="mt-2">Earn</div>
        </div>
      </nav>
    </footer>
  );
};

export default Navbar;
