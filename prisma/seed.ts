import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const cards = [
  {
    title: "Two-Minute Stress Reset",
    slug: "two-minute-stress-reset",
    category: "Stress",
    estimatedMinutes: 2,
    shortDescription:
      "A short grounding routine for noticing tension and shifting attention back to the present.",
    steps: [
      "Sit with both feet on the floor and name three things you can see.",
      "Take four slow breaths, letting each exhale last a little longer than the inhale.",
      "Notice where your shoulders, jaw, or hands are holding tension.",
      "Choose one small next action you can do in the next five minutes.",
    ],
    status: "published",
  },
  {
    title: "Focus Sprint Setup",
    slug: "focus-sprint-setup",
    category: "Focus",
    estimatedMinutes: 5,
    shortDescription:
      "A structured pre-work check-in that turns an open task into one clear focus sprint.",
    steps: [
      "Write the single outcome you want by the end of the sprint.",
      "List the first physical or digital action required to start.",
      "Move unrelated tabs, notes, and notifications out of view.",
      "Set a timer for 20 minutes and stop when the timer ends.",
    ],
    status: "published",
  },
  {
    title: "Sleep Wind-Down Audit",
    slug: "sleep-wind-down-audit",
    category: "Sleep",
    estimatedMinutes: 8,
    shortDescription:
      "A calm evening reflection that helps identify what supports or disrupts rest.",
    steps: [
      "Write down what time you want to begin winding down tonight.",
      "Name one screen, caffeine, or schedule factor that could interfere.",
      "Choose one low-effort cue such as dimming lights or preparing tomorrow's clothes.",
      "End by writing one sentence that closes the day without judging it.",
    ],
    status: "published",
  },
  {
    title: "Motivation Ladder",
    slug: "motivation-ladder",
    category: "Motivation",
    estimatedMinutes: 6,
    shortDescription:
      "A practical way to scale a goal down until the next step feels reachable.",
    steps: [
      "Write the goal in one sentence.",
      "Create three versions: full effort, medium effort, and minimum effort.",
      "Pick the minimum effort version if your energy is low.",
      "After starting, decide whether to continue or stop with credit for beginning.",
    ],
    status: "published",
  },
  {
    title: "Habit Cue Map",
    slug: "habit-cue-map",
    category: "Habits",
    estimatedMinutes: 7,
    shortDescription:
      "A behavior design exercise for connecting a small habit to a reliable daily cue.",
    steps: [
      "Choose one habit that can be completed in under two minutes.",
      "Identify a daily event that already happens without reminders.",
      "Write the cue and habit together as: after I do X, I will do Y.",
      "Place any needed object where the cue already happens.",
    ],
    status: "published",
  },
  {
    title: "Repair Conversation Notes",
    slug: "repair-conversation-notes",
    category: "Relationships",
    estimatedMinutes: 10,
    shortDescription:
      "A preparation worksheet for entering a difficult conversation with clarity and care.",
    steps: [
      "Write the issue as an observable moment rather than a character judgment.",
      "Name the impact it had on you in one sentence.",
      "Write one question that invites the other person to share context.",
      "Choose one realistic request that would help next time.",
    ],
    status: "published",
  },
  {
    title: "Attention Anchor",
    slug: "attention-anchor",
    category: "Focus",
    estimatedMinutes: 3,
    shortDescription:
      "A quick reset for returning to a task after distraction without self-criticism.",
    steps: [
      "Pause and label the distraction in neutral language.",
      "Look at your task and identify the last completed step.",
      "Write the next action as a verb plus object.",
      "Start with only two minutes of work before deciding what comes next.",
    ],
    status: "published",
  },
  {
    title: "Worry Parking Lot",
    slug: "worry-parking-lot",
    category: "Stress",
    estimatedMinutes: 6,
    shortDescription:
      "A containment exercise for capturing concerns without letting them run the whole day.",
    steps: [
      "Write each worry as a short bullet.",
      "Mark each item as controllable, influenceable, or not controllable today.",
      "Choose one controllable item and one next action.",
      "Schedule a ten-minute review window for the remaining list.",
    ],
    status: "published",
  },
  {
    title: "Morning Activation Plan",
    slug: "morning-activation-plan",
    category: "Motivation",
    estimatedMinutes: 5,
    shortDescription:
      "A simple morning planning routine for lowering friction before the day begins.",
    steps: [
      "Choose one priority that would make the day feel more organized.",
      "Prepare the first tool or document needed for that priority.",
      "Pick a start time and a stop time.",
      "Write a fallback version for low-energy conditions.",
    ],
    status: "published",
  },
  {
    title: "Consistent Bedtime Cue",
    slug: "consistent-bedtime-cue",
    category: "Sleep",
    estimatedMinutes: 4,
    shortDescription:
      "A small routine for making bedtime feel more predictable and less abrupt.",
    steps: [
      "Select one cue that signals the day is closing.",
      "Pair it with one calming action that takes less than five minutes.",
      "Keep the cue the same for three nights.",
      "Write one observation each morning about what helped or got in the way.",
    ],
    status: "published",
  },
  {
    title: "Friction Finder",
    slug: "friction-finder",
    category: "Habits",
    estimatedMinutes: 8,
    shortDescription:
      "A troubleshooting exercise for identifying why a helpful habit is hard to repeat.",
    steps: [
      "Choose one habit that has been inconsistent.",
      "Identify whether time, location, tools, energy, or confidence is the main friction.",
      "Remove one friction point before trying again.",
      "Make the next attempt smaller than the last one.",
    ],
    status: "published",
  },
  {
    title: "Listening Intention",
    slug: "listening-intention",
    category: "Relationships",
    estimatedMinutes: 5,
    shortDescription:
      "A short exercise for improving attention before a check-in with someone important.",
    steps: [
      "Write down what you want the other person to feel during the conversation.",
      "Choose one behavior that shows attention, such as pausing before responding.",
      "Prepare one open question.",
      "After the conversation, note one thing you understood more clearly.",
    ],
    status: "published",
  },
  {
    title: "Draft Review: Values Check",
    slug: "draft-review-values-check",
    category: "Motivation",
    estimatedMinutes: 9,
    shortDescription:
      "An unpublished draft that helps compare goals against personal values.",
    steps: [
      "List the goal you are considering.",
      "Name the value it supports.",
      "Name the cost or tradeoff it may require.",
      "Decide whether the next step still fits your current priorities.",
    ],
    status: "unpublished",
  },
]

const interactionTypes = ["view", "complete", "helpful", "favorite"] as const

function interactionRows(cardId: string, index: number) {
  const rows: Array<{ contentCardId: string; type: string; userId: string }> = []
  const views = 8 + index * 3
  const completions = 2 + (index % 5)
  const helpful = 1 + (index % 4)
  const favorites = index % 3

  for (let i = 0; i < views; i++) {
    rows.push({ contentCardId: cardId, type: "view", userId: `demo-user-${i % 6}` })
  }
  for (let i = 0; i < completions; i++) {
    rows.push({ contentCardId: cardId, type: "complete", userId: `demo-user-${i % 5}` })
  }
  for (let i = 0; i < helpful; i++) {
    rows.push({ contentCardId: cardId, type: "helpful", userId: `demo-user-${i % 4}` })
  }
  for (let i = 0; i < favorites; i++) {
    rows.push({ contentCardId: cardId, type: "favorite", userId: `demo-user-${i % 3}` })
  }

  return rows.filter((row) => interactionTypes.includes(row.type as (typeof interactionTypes)[number]))
}

async function main() {
  await prisma.bugTicket.deleteMany()
  await prisma.feedback.deleteMany()
  await prisma.userInteraction.deleteMany()
  await prisma.contentCard.deleteMany()

  const createdCards = []
  for (const card of cards) {
    const created = await prisma.contentCard.create({
      data: {
        ...card,
        steps: JSON.stringify(card.steps),
      },
    })
    createdCards.push(created)
  }

  for (const [index, card] of createdCards.entries()) {
    if (card.status === "published") {
      await prisma.userInteraction.createMany({
        data: interactionRows(card.id, index),
      })
    }
  }

  await prisma.feedback.createMany({
    data: [
      {
        contentCardId: createdCards[0].id,
        message: "The short format made it easy to use between meetings.",
        sentiment: "positive",
        tag: "easy-to-use",
      },
      {
        contentCardId: createdCards[1].id,
        message: "I liked having one clear outcome before starting my work block.",
        sentiment: "positive",
        tag: "focus-support",
      },
      {
        contentCardId: createdCards[2].id,
        message: "The sleep audit felt calm, but I would like a printable version.",
        sentiment: "neutral",
        tag: "feature-request",
      },
      {
        contentCardId: createdCards[5].id,
        message: "Helpful wording for preparing a conversation without blaming.",
        sentiment: "positive",
        tag: "relationships",
      },
      {
        contentCardId: createdCards[7].id,
        message: "The controllable categories helped me decide what to do next.",
        sentiment: "positive",
        tag: "stress-support",
      },
    ],
  })

  await prisma.bugTicket.createMany({
    data: [
      {
        title: "Category filter resets after opening a card",
        description:
          "When testing the exercise browser, the selected category should persist after returning from a detail view.",
        severity: "medium",
        status: "open",
        relatedPage: "/app",
        contentCardId: createdCards[1].id,
      },
      {
        title: "Analytics chart needs empty state copy",
        description:
          "If seeded interactions are removed, the dashboard should explain that no engagement data is available yet.",
        severity: "low",
        status: "in progress",
        relatedPage: "/admin/analytics",
      },
      {
        title: "Admin preview should show unpublished badge",
        description:
          "CMS testers noted that draft previews need a clear unpublished indicator before content review.",
        severity: "medium",
        status: "fixed",
        relatedPage: "/admin/content",
        contentCardId: createdCards[12].id,
        githubIssueUrl: "https://github.com/example/mindtrack-studio/issues/14",
      },
      {
        title: "Reflection helper should reject very short entries",
        description:
          "QA found that one-word reflections produce a vague summary. Add minimum length validation.",
        severity: "high",
        status: "open",
        relatedPage: "/app/reflection",
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
