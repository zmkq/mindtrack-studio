import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Brain,
  Check,
  CircleDot,
  Leaf,
  Moon,
  Mountain,
  Sprout,
  SunMedium,
} from "lucide-react"

const userTools = [
  {
    title: "Manage Stress",
    body: "Calm your mind with guided practices and evidence-based tools.",
    icon: SunMedium,
    color: "text-[#e65e48]",
  },
  {
    title: "Sleep Better",
    body: "Improve your sleep quality with night routines that work.",
    icon: Moon,
    color: "text-[#a8c764]",
  },
  {
    title: "Stay Motivated",
    body: "Reignite purpose and momentum with small daily wins.",
    icon: Mountain,
    color: "text-[#e65e48]",
  },
  {
    title: "Focus Deeply",
    body: "Train attention and build mental clarity in a noisy world.",
    icon: CircleDot,
    color: "text-[#a8c764]",
  },
  {
    title: "Build Habits",
    body: "Make good habits automatic with simple, smart systems.",
    icon: Sprout,
    color: "text-[#e65e48]",
  },
]

const contentRows = [
  ["Understanding Anxiety", "Article • 8 min read", "Published", "banner_1.png"],
  ["Breathing for Calm", "Audio • 12 min", "Published", "banner_3.png"],
  ["Thoughts & Patterns", "Video • 15 min", "Review", "women_1.png"],
  ["Gratitude Journal", "Exercise • 5 min", "Draft", "banner_book.png"],
]

const metrics = [
  ["Active users", "12,735", "+18% vs last 30 days"],
  ["Sessions", "48,921", "+22% vs last 30 days"],
  ["Avg. session time", "14m 36s", "+9% vs last 30 days"],
  ["Completion rate", "67%", "+11% vs last 30 days"],
]

export default function Home() {
  return (
    <main className="gradient-mesh grain-overlay min-h-screen overflow-hidden bg-[#090908] text-[#eee6d8]">
      <div className="relative z-10">
        <HeroSection />
        <UserSection />
        <AdminSection />
        <AnalyticsSection />
        <ClosingSection />
        <Footer />
      </div>
    </main>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[760px] border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_6%,rgba(196,95,68,0.18),transparent_30%),radial-gradient(circle_at_32%_100%,rgba(122,150,74,0.14),transparent_28%),linear-gradient(90deg,#090908_0%,#090908_42%,rgba(9,9,8,0.82)_62%,rgba(9,9,8,0.42)_100%)]" />
      {/* Animated botanical SVG */}
      <svg className="absolute left-[5%] top-[15%] hidden size-[340px] text-[#7c4b2c]/[0.08] lg:block" viewBox="0 0 200 200" fill="none">
        <path d="M100 180C100 180 60 140 60 100C60 60 100 20 100 20" stroke="currentColor" strokeWidth="0.8" className="anim-fade delay-6" />
        <path d="M100 180C100 180 140 140 140 100C140 60 100 20 100 20" stroke="currentColor" strokeWidth="0.8" className="anim-fade delay-7" />
        <circle cx="100" cy="20" r="4" fill="currentColor" className="anim-scale delay-8" />
        <path d="M75 80C60 70 55 55 65 45C78 55 78 70 75 80Z" stroke="currentColor" strokeWidth="0.6" className="anim-fade delay-9" />
        <path d="M125 80C140 70 145 55 135 45C122 55 122 70 125 80Z" stroke="currentColor" strokeWidth="0.6" className="anim-fade delay-10" />
        <path d="M85 130C70 125 60 115 68 105C82 112 85 122 85 130Z" stroke="currentColor" strokeWidth="0.6" className="anim-fade delay-11" />
        <path d="M115 130C130 125 140 115 132 105C118 112 115 122 115 130Z" stroke="currentColor" strokeWidth="0.6" className="anim-fade delay-12" />
      </svg>
      <div className="absolute right-0 top-0 h-full w-[58%] opacity-55">
        <Image
          src="/banner_book_2.png"
          alt="Quiet journaling scene"
          fill
          priority
          className="object-cover"
          sizes="58vw"
        />
      </div>
      <div className="absolute left-[48%] top-28 hidden h-[520px] w-[260px] rotate-[7deg] overflow-hidden rounded-[18px] border border-[#8a6d51]/35 bg-[#171511] shadow-2xl shadow-black/70 lg:block" style={{ animation: 'float 8s ease-in-out infinite' }}>
        <Image
          src="/women_2.png"
          alt="Reflective portrait"
          fill
          className="object-cover"
          sizes="260px"
        />
      </div>
      <div className="absolute right-[14%] top-48 hidden w-[250px] rounded-xl border border-white/15 bg-[#151411]/85 p-5 shadow-2xl shadow-black/50 backdrop-blur md:block anim-left delay-8">
        <p className="text-xs text-[#9a9184]">Weekly progress</p>
        <div className="mt-5 flex h-24 items-end gap-2">
          {[34, 18, 26, 22, 58, 42, 64, 50, 46].map((height, index) => (
            <span
              key={index}
              className="w-full rounded-t bg-gradient-to-t from-[#e65e48] to-[#a8c764] transition-all duration-700 hover:opacity-100"
              style={{ height: `${height}%`, opacity: 0.5 + index * 0.06, animationDelay: `${index * 60}ms` }}
            />
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4">
          <p className="text-xs text-[#9a9184]">Mind score</p>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-[#e65e48] glow-text-coral">+12%</span>
            <span className="grid size-14 place-items-center rounded-full border-4 border-[#a8c764] text-lg" style={{ animation: 'breathe 4s ease-in-out infinite' }}>
              78
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col px-6 py-8 lg:px-10">
        <Nav />
        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:py-24">
          <div className="max-w-2xl">
            <div className="anim-up mb-7 inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
              Psychology in practice
            </div>
            <h1 className="anim-up delay-1 font-[Georgia] text-[4.1rem] leading-[0.96] tracking-normal text-[#f1e6d6] md:text-[5.8rem]">
              Psych tools,
              <br />
              built for <span className="shimmer-text">real life.</span>
            </h1>
            <p className="anim-up delay-2 mt-7 max-w-xl text-lg leading-8 text-[#b7afa4]">
              MindTrack Studio helps people understand their minds and build
              healthier daily habits, backed by psychology, designed for life.
            </p>
            <div className="anim-up delay-3 mt-10 flex flex-wrap gap-4">
              <LandingButton href="/app" variant="primary">
                Open User App
              </LandingButton>
              <LandingButton href="/admin/content">Enter Admin Studio</LandingButton>
            </div>
            <div className="anim-up delay-4 mt-10 flex max-w-md gap-4 text-sm text-[#b8b0a4]">
              <Leaf className="mt-1 size-6 shrink-0 text-[#7f9b44]" />
              <p>Built by researchers. Used on campuses. Trusted by wellbeing teams.</p>
            </div>
          </div>

          <div className="relative min-h-[520px] lg:min-h-[640px]">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function Nav() {
  return (
    <header className="flex items-center justify-between gap-6">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full border border-[#eee6d8]">
          <Brain className="size-5" />
        </span>
        <span className="text-xs font-semibold uppercase leading-4 tracking-[0.28em]">
          MindTrack
          <br />
          Studio
        </span>
      </Link>
      <nav className="hidden items-center gap-12 text-sm text-[#e8dece] lg:flex">
        <a href="#users">For Users</a>
        <a href="#admins">For Admins</a>
        <a href="#analytics">Analytics</a>
        <a href="#about">About</a>
        <a href="#research">Research</a>
      </nav>
      <div className="hidden gap-3 md:flex">
        <LandingButton href="/app" variant="primary" compact>
          Open User App
        </LandingButton>
        <LandingButton href="/admin/content" compact>
          Enter Admin Studio
        </LandingButton>
      </div>
    </header>
  )
}

function PhoneMockup() {
  return (
    <div className="absolute bottom-0 left-1/2 w-[270px] -translate-x-1/2 rounded-[34px] border border-[#b28b6d]/50 bg-[#10100f] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.85)] lg:left-[44%]">
      <div className="rounded-[26px] border border-white/10 bg-[#151512] p-5">
        <div className="mx-auto mb-6 h-5 w-20 rounded-full bg-black" />
        <p className="text-xs text-[#8f887d]">Your toolkit</p>
        <h2 className="mt-2 font-[Georgia] text-2xl leading-tight">
          Good evening,
          <br />
          Take a breath,
          <br />
          <span className="text-[#e65e48]">you&apos;ve got this.</span>
        </h2>
        <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs text-[#8f887d]">Today&apos;s focus</p>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="font-medium">Manage Stress</p>
              <p className="text-xs text-[#8f887d]">12 min · Guided</p>
            </div>
            <span className="grid size-8 place-items-center rounded-full border-2 border-[#e65e48]">
              <span className="size-2 rounded-full bg-[#e65e48]" />
            </span>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {["Mood check-in", "Evening reflection", "Gratitude practice"].map((item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className={index === 0 ? "text-[#a8c764]" : "text-[#d47742]"}>
                  <CircleDot className="size-3" />
                </span>
                {item}
              </span>
              <span className="text-xs text-[#8f887d]">{index === 0 ? "Done" : `${5 - index * 2} min`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function UserSection() {
  return (
    <section id="users" className="relative border-b border-white/10 bg-[#0d0d0c] px-6 py-20 lg:px-10">
      {/* Decorative botanical SVG */}
      <svg className="absolute right-[8%] top-12 hidden size-[180px] text-[#7c4b2c]/[0.06] lg:block" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" className="anim-fade delay-4" style={{ animation: 'breathe 10s ease-in-out infinite' }} />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" className="anim-fade delay-6" style={{ animation: 'breathe 8s ease-in-out infinite 1s' }} />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" className="anim-fade delay-8" style={{ animation: 'breathe 6s ease-in-out infinite 2s' }} />
      </svg>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[0.62fr_1fr]">
          <div className="anim-up">
            <SectionLabel>For Users</SectionLabel>
            <h2 className="mt-4 font-[Georgia] text-4xl leading-none md:text-5xl">
              Everyday support
              <br />
              for a <span className="gradient-text">better mind.</span>
            </h2>
          </div>
          <p className="anim-up delay-1 max-w-2xl self-end text-lg leading-8 text-[#b7afa4]">
            Science-backed tools to help you manage stress, sleep better, stay
            motivated, focus deeper, and build habits that last.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {userTools.map((tool, index) => (
            <article
              key={tool.title}
              className={`glass-card hover-lift anim-up delay-${index + 2} min-h-56 rounded-lg p-6`}
            >
              <tool.icon className={`size-10 ${tool.color} transition-transform duration-500 hover:scale-110`} />
              <h3 className="mt-8 text-lg font-semibold">{tool.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#aaa296]">{tool.body}</p>
              <Link
                href="/app"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#e65e48] transition-all hover:gap-3"
              >
                Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AdminSection() {
  return (
    <section id="admins" className="border-b border-white/10 bg-[#090908] px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.55fr_1.45fr]">
        <div className="self-center">
          <SectionLabel tone="green">For Admins</SectionLabel>
          <h2 className="mt-4 font-[Georgia] text-4xl leading-none md:text-5xl">
            Create. Curate.
            <br />
            Deliver impact.
          </h2>
          <p className="mt-7 max-w-sm leading-7 text-[#b7afa4]">
            MindTrack Studio gives your team the power to create content, manage
            users, and ensure a safe, supportive space.
          </p>
          <div className="mt-10">
            <LandingButton href="/admin/content">Enter Admin Studio</LandingButton>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#131210] p-4 shadow-2xl shadow-black/30">
          <div className="grid min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-[#0f0f0d] lg:grid-cols-[150px_1fr_250px]">
            <aside className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
              <div className="mb-8 flex items-center gap-2">
                <Brain className="size-5" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
                  MindTrack
                </span>
              </div>
              {["Overview", "Content", "Programs", "Users", "Moderation", "Reviews", "Analytics"].map(
                (item) => (
                  <div
                    key={item}
                    className={`rounded-md px-3 py-2 text-sm ${
                      item === "Content"
                        ? "bg-[#eee6d8]/10 text-[#eee6d8]"
                        : "text-[#8f887d]"
                    }`}
                  >
                    {item}
                  </div>
                )
              )}
            </aside>
            <div className="p-6">
              <h3 className="text-2xl font-semibold">Content</h3>
              <div className="mt-5 flex gap-8 border-b border-white/10 pb-3 text-xs text-[#8f887d]">
                <span className="text-[#e65e48]">All</span>
                <span>Drafts</span>
                <span>Review</span>
                <span>Published</span>
              </div>
              <div className="mt-3 divide-y divide-white/10">
                {contentRows.map(([title, meta, status, image]) => (
                  <div key={title} className="grid grid-cols-[52px_1fr_auto] items-center gap-4 py-4">
                    <div className="relative size-12 overflow-hidden rounded">
                      <Image src={`/${image}`} alt="" fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-xs text-[#8f887d]">{meta}</p>
                    </div>
                    <span
                      className={
                        status === "Published"
                          ? "text-xs text-[#a8c764]"
                          : status === "Review"
                            ? "text-xs text-[#d4874b]"
                            : "text-xs text-[#8f887d]"
                      }
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <aside className="border-t border-white/10 p-5 lg:border-l lg:border-t-0">
              <h3 className="font-semibold">Publish</h3>
              <div className="mt-6 space-y-4 text-sm">
                {["Content details", "Preview"].map((item) => (
                  <p key={item} className="flex items-center gap-2">
                    <Check className="size-4 text-[#a8c764]" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="mt-8 space-y-3 text-sm text-[#8f887d]">
                <p>Audience</p>
                <div className="rounded-md border border-white/10 bg-black/20 px-3 py-3 text-[#eee6d8]">
                  Students
                </div>
                <p>Schedule</p>
                <div className="rounded-md border border-white/10 bg-black/20 px-3 py-3 text-[#eee6d8]">
                  May 20, 2025 · 9:00 AM
                </div>
              </div>
              <LandingButton href="/admin/content" variant="primary" full>
                Publish now
              </LandingButton>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

function AnalyticsSection() {
  return (
    <section id="analytics" className="border-b border-white/10 bg-[#0d0d0c] px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.45fr_1.55fr]">
        <div>
          <SectionLabel tone="red">Analytics</SectionLabel>
          <h2 className="mt-4 font-[Georgia] text-4xl leading-none md:text-5xl">
            Measure what
            <br />
            matters.
          </h2>
          <p className="mt-7 max-w-sm leading-7 text-[#b7afa4]">
            Understand impact, track engagement, and make data-informed
            decisions that improve mental wellbeing.
          </p>
          <Link
            href="/admin/analytics"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#e65e48]"
          >
            View all analytics <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#12110f] p-5">
          <div className="grid gap-4 md:grid-cols-4">
            {metrics.map(([label, value, delta]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-black/15 p-5">
                <p className="text-xs text-[#8f887d]">{label}</p>
                <p className="mt-3 text-2xl font-semibold">{value}</p>
                <p className="mt-2 text-xs text-[#a8c764]">{delta}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.9fr]">
            <div className="rounded-lg border border-white/10 bg-black/15 p-5">
              <h3 className="font-semibold">Engagement over time</h3>
              <div className="mt-8 flex h-48 items-end gap-3">
                {[56, 43, 68, 58, 77, 64, 88, 49, 61, 74, 58, 82, 71].map(
                  (height, index) => (
                    <span key={index} className="flex flex-1 flex-col justify-end gap-1">
                      <span
                        className="rounded-t bg-[#a8c764]"
                        style={{ height: `${height}%` }}
                      />
                      <span
                        className="rounded-t bg-[#e65e48]"
                        style={{ height: `${Math.max(18, height - 20)}%` }}
                      />
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/15 p-5">
              <h3 className="font-semibold">Top tools</h3>
              <div className="mt-8 flex items-center gap-8">
                <div className="grid size-36 place-items-center rounded-full border-[22px] border-[#a8c764] border-r-[#e65e48] border-b-[#74695d] text-2xl font-semibold">
                  32%
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    ["Breathing", "32%"],
                    ["Reflection", "24%"],
                    ["Sleep", "18%"],
                    ["Stress", "14%"],
                    ["Other", "12%"],
                  ].map(([name, value]) => (
                    <p key={name} className="flex min-w-36 justify-between gap-6">
                      <span className="text-[#b7afa4]">{name}</span>
                      <span>{value}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-6 py-16 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(212,117,66,0.18),transparent_32%),linear-gradient(90deg,#15110d,#0a0a09)]" />
      {/* Animated vine SVG */}
      <svg className="absolute left-[10%] top-0 hidden h-full w-[120px] text-[#7c4b2c]/[0.08] lg:block" viewBox="0 0 60 300" fill="none">
        <path d="M30 0 C30 50 15 80 30 120 C45 160 15 200 30 240 C45 280 30 300 30 300" stroke="currentColor" strokeWidth="0.8" className="anim-fade delay-2" />
        <path d="M30 60 C20 50 15 40 22 32 C30 40 30 52 30 60Z" stroke="currentColor" strokeWidth="0.5" className="anim-fade delay-4" />
        <path d="M30 120 C40 110 45 98 38 90 C30 100 30 112 30 120Z" stroke="currentColor" strokeWidth="0.5" className="anim-fade delay-6" />
        <path d="M30 180 C20 170 12 160 20 150 C30 158 30 170 30 180Z" stroke="currentColor" strokeWidth="0.5" className="anim-fade delay-8" />
        <path d="M30 240 C40 230 48 218 40 210 C30 220 30 232 30 240Z" stroke="currentColor" strokeWidth="0.5" className="anim-fade delay-10" />
      </svg>
      <div className="absolute bottom-0 right-6 hidden h-48 w-80 opacity-80 md:block">
        <Image src="/seed.png" alt="Warm botanical table scene" fill className="object-cover" sizes="320px" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8">
        <div className="anim-up">
          <h2 className="font-[Georgia] text-4xl leading-tight">
            Better minds. <span className="shimmer-text">Stronger communities.</span>
          </h2>
          <p className="mt-3 max-w-xl text-[#b7afa4]">
            MindTrack Studio is research-driven, privacy-first, and built to
            help people thrive.
          </p>
        </div>
        <div className="anim-up delay-2 flex flex-wrap gap-3">
          <LandingButton href="/app" variant="primary">
            Open User App
          </LandingButton>
          <LandingButton href="/admin/content">Enter Admin Studio</LandingButton>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="about" className="bg-[#080807] px-6 py-10 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1.4fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full border border-[#eee6d8]">
              <Brain className="size-4" />
            </span>
            <span className="text-[10px] font-semibold uppercase leading-4 tracking-[0.28em]">
              MindTrack
              <br />
              Studio
            </span>
          </Link>
          <p className="mt-6 text-sm leading-6 text-[#8f887d]">
            A research initiative advancing mental wellbeing on campuses.
          </p>
        </div>
        <FooterGroup title="Product" links={["For Users", "For Admins", "Analytics"]} />
        <FooterGroup title="Company" links={["About", "Research", "Careers"]} />
        <FooterGroup title="Resources" links={["Help Center", "Privacy", "Terms"]} />
        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <p className="mt-4 text-sm text-[#8f887d]">hello@mindtrack.studio</p>
          <p className="mt-10 text-xs text-[#6f685f]">© 2026 MindTrack Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-4 space-y-2 text-sm text-[#8f887d]">
        {links.map((link) => (
          <p key={link}>{link}</p>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({
  children,
  tone = "orange",
}: {
  children: React.ReactNode
  tone?: "orange" | "green" | "red"
}) {
  const color =
    tone === "green" ? "text-[#8eaa56]" : tone === "red" ? "text-[#e65e48]" : "text-[#d4874b]"

  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${color}`}>
      {children}
    </p>
  )
}

function LandingButton({
  href,
  children,
  variant = "outline",
  compact = false,
  full = false,
}: {
  href: string
  children: React.ReactNode
  variant?: "primary" | "outline"
  compact?: boolean
  full?: boolean
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-md border text-sm font-semibold transition-all duration-300 ${
        compact ? "h-11 px-5" : "h-14 px-8"
      } ${full ? "mt-8 w-full" : ""} ${
        variant === "primary"
          ? "border-[#e65e48] bg-[#e65e48] text-black glow-coral-strong hover:scale-[1.03] hover:bg-[#f27760] hover:shadow-[0_16px_50px_rgba(230,94,72,0.35)]"
          : "border-[#756654] bg-black/15 text-[#eee6d8] hover:border-[#b99b79] hover:bg-white/5"
      }`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
