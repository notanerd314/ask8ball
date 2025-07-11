export const DICE_SIZE_MULTIPLIER = 0.6;
export const QUESTION_MAX_LENGTH = 70;
export const SHAKE_DURATION = 2200;
export const RESULT_SHOW_DELAY = 500;
export const DICE_TRANSITION_DURATION = 0.75;

export const INITIAL_DICE_STYLE: React.CSSProperties = {
  opacity: "0",
  transition: "none"
};

export const RESULT_DICE_STYLE: React.CSSProperties = {
  transition: `opacity ${DICE_TRANSITION_DURATION}s ease`,
  opacity: "1",
};

export const CHARACTER_LIMITS = {
  WARNING_THRESHOLD: 30,
  MAX_LENGTH: QUESTION_MAX_LENGTH
} as const;