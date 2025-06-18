import { BallStateType } from "../context/GlobalContext";

function PureEightBallSvg(currentState: BallStateType, diceStyle: React.CSSProperties) {
    const canShowDefault = currentState === "normal" || currentState === "shaking";
    const canShowResult = currentState === "result";
    const canShowError = currentState === "error";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="348 234 440 440"
            width="100%"
            height="100%"
        >
            <defs>
                <linearGradient id="innerDiceBackgroundGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#282828" />
                    <stop offset="50%" stopColor="#0F0F0F" />
                </linearGradient>

                <linearGradient id="borderGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FFF" />
                    <stop offset="35%" stopColor="#282828" />
                </linearGradient>

                <linearGradient id="innerBackgroundGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#DBDBDB" />
                    <stop offset="100%" stopColor="white" />
                </linearGradient>
            </defs>

            <ellipse cx="568" cy="454" fill={canShowResult ? "url(#borderGrad)" : "white"} rx="115" ry="113" />
            <path fill={canShowDefault ? "url(#innerBackgroundGrad)" : "url(#innerDiceBackgroundGrad)"} stroke="transparent" strokeMiterlimit="10" d="M678 454.4c1.4-58.6-48.9-107-109.8-105.5-61-1.4-111.2 47-109.7 105.5-1.5 58.5 48.8 106.9 109.7 105.5 61 1.4 111.2-46.7 109.7-105.5z" />
            <path fill={canShowResult ? "#303084" : canShowError ? "#fff" : "none"} style={diceStyle} stroke="transparent" d="M481.3 402.7c-3.1-5.7.3-10.4 8.2-10.7 50.6-1.6 107.6-1.6 157.4.3 7.6.2 11 5.2 7.9 10.6a2332.4 2332.4 0 0 1-80 131.1c-3.6 5.7-9.6 5.7-13.3 0a2645.3 2645.3 0 0 1-80.1-131.3z" />

            <ellipse cx="570" cy="425.4" fill="none" stroke="#141919" strokeWidth="20" rx="30" ry="30" opacity={canShowDefault ? "1" : "0"} />
            <ellipse cx="570" cy="485.4" fill="none" stroke="#141919" strokeWidth="20" rx="30" ry="30" opacity={canShowDefault ? "1" : "0"} />
        </svg>
    )
}