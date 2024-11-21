'use client'
import { useRouter } from 'next/navigation'
interface ActionButtonProps {
  text: string;
  imgSrc: string;
  bgColor: string;
  textColor: string;
  onClick?: () => void; // Optional callback for button click
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  imgSrc,
  bgColor,
  textColor,
  onClick,
}) => {
  const router = useRouter();

  function handleClick() {
    if (onClick) {
      onClick();
      return;
    }
    router.push('/coming-soon')
  }
  return (
    <button
      onClick={handleClick}
      className={`flex flex-1 shrink gap-1 justify-center items-center px-2.5 py-5 text-base font-medium tracking-tight leading-none whitespace-nowrap ${bgColor} basis-0 min-h-[60px] rounded-[1000px] ${textColor}`}
    >
      <img
        loading="lazy"
        src={imgSrc}
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        alt=""
      />
      {text}
    </button>
  );
};

export default ActionButton;
