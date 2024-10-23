'use client'

interface CardProps {
    cardNumber: string;
    validThru: string;
    backgroundImg: string;
    logoImg: string;
    additionalLogo?: string;
}

const Card: React.FC<CardProps> = ({
    cardNumber,
    validThru,
    backgroundImg,
    logoImg,
    additionalLogo,
}) => {
    return (
        <div
            className="flex relative flex-row justify-between self-stretch p-5 w-[20%]"
        >
            <img
                loading="lazy"
                src={backgroundImg}
                className="object-scale-down absolute inset-0 h-full"
                alt=""
            />
            <div className="flex relative gap-10 justify-between items-start w-full text-lg font-semibold tracking-tight leading-none text-white">
            </div>
            <div className="flex relative gap-10 justify-between items-end mt-24 w-full">
            </div>
        </div>
    );
};

export default Card;
