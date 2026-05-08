"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Eye } from "lucide-react"
import { driver, DriveStep } from "driver.js"
import "driver.js/dist/driver.css"

type TourDefinition = Record<string, DriveStep[]>

const tourMap: TourDefinition = {
  landing: [
    {
      element: "main",
      popover: {
        title: "The front gallery",
        description: "This page is the public story: users, admins, analytics, and the product promise in one cinematic arc.",
        side: "bottom",
        align: "start"
      },
    },
  ],
  app: [
    {
      element: "[data-tour='app-hero']",
      popover: {
        title: "Practice Library",
        description: "Start here to understand what the user sees: short psychology-informed tools organized for everyday needs.",
        side: "bottom",
      },
    },
    {
      element: "[data-tour='app-categories']",
      popover: {
        title: "Topic Lens",
        description: "Use categories as curatorial filters. They mirror the backend content taxonomy and keep browsing calm.",
        side: "bottom",
      },
    },
    {
      element: "[data-tour='app-grid']",
      popover: {
        title: "Practice Cards",
        description: "Each card is backed by seeded content and live interaction metrics from the database.",
        side: "top",
      },
    },
    {
      element: "[data-tour='app-detail']",
      popover: {
        title: "Interaction Surface",
        description: "Complete, helpful, save, and feedback actions write through the API so analytics can respond.",
        side: "left",
      },
    },
  ],
  reflection: [
    {
      element: "[data-tour='reflection-hero']",
      popover: {
        title: "Safe Entry",
        description: "The reflection helper opens with clear scope: supportive reflection, not therapy or medical advice.",
        side: "bottom",
      },
    },
    {
      element: "[data-tour='reflection-journal']",
      popover: {
        title: "Free Writing",
        description: "The journal accepts a short entry and sends it to the rule-based reflection API.",
        side: "right",
      },
    },
    {
      element: "[data-tour='reflection-moods']",
      popover: {
        title: "Mood Context",
        description: "Mood chips help the user frame their state before reading the generated summary.",
        side: "top",
      },
    },
    {
      element: "[data-tour='reflection-summary']",
      popover: {
        title: "Supportive Summary",
        description: "The response turns the entry into a gentle summary, reminder, and next step.",
        side: "left",
      },
    },
  ],
  content: [
    {
      element: "[data-tour='admin-nav']",
      popover: {
        title: "Studio Navigation",
        description: "The admin rail now links to every advertised area, including lightweight route shells for future modules.",
        side: "right",
      },
    },
    {
      element: "[data-tour='admin-search']",
      popover: {
        title: "Global Search",
        description: "This top field anchors the studio workflow for content, users, tags, and operational lookup.",
        side: "bottom",
      },
    },
    {
      element: "[data-tour='admin-create']",
      popover: {
        title: "Create Content",
        description: "This opens the creation flow and posts new cards through the CMS API with validation.",
        side: "bottom",
      },
    },
    {
      element: "[data-tour='admin-table']",
      popover: {
        title: "Editorial Table",
        description: "The table is the content command center: select, edit, delete, preview, and inspect status.",
        side: "top",
      },
    },
    {
      element: "[data-tour='admin-inspector']",
      popover: {
        title: "Publishing Inspector",
        description: "The right panel previews content and publishes or drafts items using the backend.",
        side: "left",
      },
    },
  ],
  analytics: [
    {
      element: "[data-tour='analytics-metrics']",
      popover: {
        title: "Signal Row",
        description: "Headline metrics translate seeded interactions into a fast read on user engagement.",
        side: "bottom",
      },
    },
    {
      element: "[data-tour='analytics-chart']",
      popover: {
        title: "Engagement Gallery",
        description: "The chart compares active users and sessions with a restrained research-studio treatment.",
        side: "bottom",
      },
    },
    {
      element: "[data-tour='analytics-categories']",
      popover: {
        title: "Category Performance",
        description: "Topic cards show where content is helping people complete practices.",
        side: "right",
      },
    },
    {
      element: "[data-tour='analytics-insights']",
      popover: {
        title: "Insight Wall",
        description: "Lower panels convert raw activity into ranked content, sentiment, funnel, and impact notes.",
        side: "top",
      },
    },
  ],
  qa: [
    {
      element: "[data-tour='qa-metrics']",
      popover: {
        title: "Testing Pulse",
        description: "The QA summary gives an immediate view of open, in-progress, fixed, and high-severity work.",
        side: "bottom",
      },
    },
    {
      element: "[data-tour='qa-board']",
      popover: {
        title: "Ticket Board",
        description: "Tickets are grouped by state and can be moved or deleted through the QA API.",
        side: "top",
      },
    },
    {
      element: "[data-tour='qa-inspector']",
      popover: {
        title: "Bug Intake",
        description: "The inspector creates tickets, links content, and keeps severity and status explicit.",
        side: "left",
      },
    },
  ],
}

function routeKey(pathname: string) {
  if (pathname === "/") return "landing"
  if (pathname === "/app") return "app"
  if (pathname === "/app/reflection") return "reflection"
  if (pathname === "/admin/content") return "content"
  if (pathname === "/admin/analytics") return "analytics"
  if (pathname === "/admin/qa") return "qa"
  if (pathname.startsWith("/admin")) return "content"
  return "landing"
}

export function MuseumTour() {
  const pathname = usePathname()
  const key = routeKey(pathname)
  const steps = tourMap[key] ?? []
  
  const storageKey = `mindtrack.museum-tour.v3.${key}`
  const [hasSteps, setHasSteps] = useState(false)
  const driverInstanceRef = useRef<ReturnType<typeof driver> | null>(null)

  useEffect(() => {
    setHasSteps(steps.length > 0)
    
    if (steps.length === 0) return

    driverInstanceRef.current = driver({
      showProgress: true,
      animate: true,
      steps: steps,
      popoverClass: "museum-driver-theme",
      allowClose: true,
      progressText: 'Gallery note {{current}} / {{total}}',
      nextBtnText: 'Next piece',
      prevBtnText: 'Previous',
      doneBtnText: 'Finish',
      onDestroyStarted: () => {
        if (driverInstanceRef.current?.hasNextStep()) {
          driverInstanceRef.current?.destroy();
        } else {
          driverInstanceRef.current?.destroy();
          window.localStorage.setItem(storageKey, "seen");
        }
      },
      onPopoverRender: (popover, { config, state }) => {
        // We can add any custom rendering hooks here if needed.
        // But driver.js works great out of the box with CSS.
      }
    });

    const seen = window.localStorage.getItem(storageKey)
    if (!seen) {
      const timeout = window.setTimeout(() => {
        driverInstanceRef.current?.drive()
      }, 700)
      return () => window.clearTimeout(timeout)
    }
  }, [pathname, steps, storageKey])

  if (!hasSteps) return null

  function startTour() {
    driverInstanceRef.current?.drive()
  }

  return (
    <>
      <style>{`
        .museum-driver-theme.driver-popover {
          background-color: #11100e !important;
          border: 1px solid rgba(138, 91, 55, 0.6) !important;
          color: #eee6d8 !important;
          border-radius: 16px !important;
          padding: 24px !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 55px rgba(230, 94, 72, 0.15) !important;
          font-family: inherit !important;
          background-image: radial-gradient(circle at 15% 0%, rgba(230,94,72,0.12), transparent 34%), radial-gradient(circle at 85% 15%, rgba(168,199,100,0.08), transparent 36%) !important;
          backdrop-filter: blur(8px) !important;
          max-width: 450px !important;
        }

        /* Target the arrow of the popover */
        .museum-driver-theme.driver-popover-arrow-side-left,
        .museum-driver-theme.driver-popover-arrow-side-right,
        .museum-driver-theme.driver-popover-arrow-side-top,
        .museum-driver-theme.driver-popover-arrow-side-bottom {
          border-color: rgba(138, 91, 55, 0.6) !important;
        }

        .museum-driver-theme .driver-popover-title {
          font-family: Georgia, serif !important;
          font-size: 26px !important;
          font-weight: 400 !important;
          color: #eee6d8 !important;
          margin-bottom: 12px !important;
          letter-spacing: -0.02em !important;
        }

        .museum-driver-theme .driver-popover-description {
          color: #b7afa4 !important;
          font-size: 15px !important;
          line-height: 1.6 !important;
          margin-bottom: 24px !important;
        }

        .museum-driver-theme .driver-popover-footer {
          display: flex !important;
          align-items: center !important;
          margin-top: 24px !important;
        }

        .museum-driver-theme .driver-popover-progress-text {
          color: #d4874b !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.24em !important;
          font-weight: 600 !important;
        }

        .museum-driver-theme button {
          background-color: transparent !important;
          color: #8f887d !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          text-shadow: none !important;
          font-size: 13px !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          transition: all 0.2s !important;
          cursor: pointer !important;
        }

        .museum-driver-theme button:hover {
          color: #eee6d8 !important;
          background-color: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }

        .museum-driver-theme .driver-popover-next-btn {
          background-color: #e65e48 !important;
          color: #000 !important;
          font-weight: 600 !important;
          border-color: #e65e48 !important;
        }

        .museum-driver-theme .driver-popover-next-btn:hover {
          background-color: #f76f59 !important;
          color: #000 !important;
          border-color: #f76f59 !important;
          transform: translateY(-1px);
        }

        .museum-driver-theme .driver-popover-close-btn {
          color: #8f887d !important;
          top: 16px !important;
          right: 16px !important;
          padding: 4px !important;
          border: none !important;
        }

        .museum-driver-theme .driver-popover-close-btn:hover {
          color: #eee6d8 !important;
          background-color: transparent !important;
        }

        /* SVG override for close btn */
        .museum-driver-theme .driver-popover-close-btn svg {
          width: 14px;
          height: 14px;
        }

        /* Highlight overlay styling to give it that cinematic focus */
        div#driver-highlighted-element-stage {
          border-radius: 12px !important;
          outline: 2px solid #e65e48 !important;
          outline-offset: 4px !important;
          background: rgba(255,255,255,0.02) !important;
          box-shadow: 0 0 30px rgba(230, 94, 72, 0.2) !important;
        }
      `}</style>
      <button
        type="button"
        onClick={startTour}
        className="fixed bottom-5 right-5 z-40 hidden h-11 items-center gap-2 rounded-full border border-[#8a5b37]/70 bg-[#11110f]/90 px-4 text-sm text-[#d8cebd] shadow-2xl shadow-black/40 backdrop-blur md:flex transition-all hover:bg-[#1a1816] hover:scale-105"
      >
        <Eye className="size-4 text-[#d4874b]" />
        Tour
      </button>
    </>
  )
}
