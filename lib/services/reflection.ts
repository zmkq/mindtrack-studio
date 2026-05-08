import { reflectionInputSchema } from "@/lib/schemas"

const DISCLAIMER =
  "This is not therapy or medical advice. It is only a reflection helper."

export function summarizeReflection(input: unknown) {
  const { reflection } = reflectionInputSchema.parse(input)
  const lower = reflection.toLowerCase()
  const themes = [
    lower.match(/stress|overwhelm|pressure|anxious/) ? "stress load" : null,
    lower.match(/sleep|tired|rest|bed/) ? "rest and recovery" : null,
    lower.match(/focus|distract|attention|procrastinat/) ? "attention and follow-through" : null,
    lower.match(/friend|partner|family|team|relationship/) ? "connection with other people" : null,
    lower.match(/habit|routine|consistent|pattern/) ? "routine design" : null,
  ].filter(Boolean)

  const nextStep = lower.match(/stress|overwhelm|pressure|anxious/)
    ? "Choose one controllable task and give it a ten-minute window."
    : lower.match(/sleep|tired|rest|bed/)
      ? "Pick one wind-down cue you can repeat tonight."
      : lower.match(/focus|distract|attention|procrastinat/)
        ? "Write the next action as a verb plus object before starting."
        : lower.match(/friend|partner|family|team|relationship/)
          ? "Name one question that would help clarify the other person's perspective."
          : "Choose one small action that matches what matters most in the reflection."

  return {
    disclaimer: DISCLAIMER,
    summary:
      themes.length > 0
        ? `Your reflection seems to center on ${themes.join(", ")}. The tone suggests you are trying to create more clarity before acting.`
        : "Your reflection points to a need for a smaller, clearer next step. It may help to separate what happened, what matters, and what you can do next.",
    supportivePrompt:
      "What would be a kind and realistic next step that takes less than ten minutes?",
    suggestedNextStep: nextStep,
  }
}
