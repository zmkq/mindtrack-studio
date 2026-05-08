"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  ChevronRight,
  Database,
  Globe,
  Key,
  Lock,
  Mail,
  Palette,
  Save,
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react"

import { AdminShell } from "@/components/admin-shell"
import { Input } from "@/components/ui/input"

export function AdminSettingsPanel() {
  return (
    <AdminShell
      activeItem="Settings"
      searchPlaceholder="Search settings..."
      sidebarNote={{ title: "Configuration", subtitle: "Tuned with care.\nBuilt to last." }}
      quickActions={["Save Changes", "Reset Defaults", "Export Config"]}
    >
      <div className="anim-up flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="inline-flex rounded border border-[#8a5b37]/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4874b] glow-text-amber">
            Studio configuration
          </div>
          <h1 className="mt-5 font-[Georgia] text-5xl leading-none text-[#f1e6d6]">
            Settings
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#aaa296]">
            Configure authentication providers, roles, content rules, and
            organization defaults for your MindTrack Studio instance.
          </p>
        </div>
        <button className="inline-flex h-12 items-center gap-2 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black glow-coral-strong transition-all hover:scale-[1.03] hover:shadow-[0_16px_50px_rgba(230,94,72,0.35)]">
          <Save className="size-4" /> Save Changes
        </button>
      </div>

      <div className="mt-9 border-b border-white/10">
        <div className="flex gap-10 text-sm text-[#8f887d]">
          {["General", "Authentication", "Roles & Access", "Content Rules", "Notifications", "API & Integrations"].map((tab, index) => (
            <button key={tab} className={`relative h-12 ${index === 0 ? "text-[#e65e48]" : ""}`}>
              {tab}
              {index === 0 ? <span className="absolute inset-x-0 bottom-0 h-px bg-[#e65e48]" /> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <GeneralSettings />
        <AuthenticationSettings />
        <RolesSettings />
        <ContentRulesSettings />
        <NotificationSettings />
        <ApiSettings />
      </div>

      <section className="border-glow anim-up delay-12 mt-8 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/10 bg-[#11110f] px-8 py-7">
        <div className="flex items-center gap-8">
          <Settings className="hidden size-16 text-[#8a4e31] md:block" />
          <div>
            <h2 className="font-[Georgia] text-3xl">Configuration is care.</h2>
            <p className="mt-2 text-sm text-[#8f887d]">
              Every setting shapes how your team works and how users experience MindTrack.
            </p>
          </div>
        </div>
        <Link href="/admin/content" className="flex h-12 items-center gap-3 rounded-md bg-[#e65e48] px-6 text-sm font-semibold text-black">
          Back to Studio <ArrowRight className="size-4" />
        </Link>
      </section>
    </AdminShell>
  )
}

function SettingsSection({ icon: Icon, title, description, children }: { icon: typeof Settings; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-white/10 bg-[#11110f] p-7">
      <div className="flex items-center gap-4">
        <Icon className="size-6 text-[#d4874b]" />
        <div>
          <h2 className="font-[Georgia] text-2xl text-[#f1e6d6]">{title}</h2>
          <p className="mt-0.5 text-sm text-[#8f887d]">{description}</p>
        </div>
      </div>
      <div className="mt-7 space-y-5">
        {children}
      </div>
    </section>
  )
}

function SettingRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-8 border-t border-white/10 pt-5">
      <div className="max-w-sm">
        <p className="text-sm text-[#eee6d8]">{label}</p>
        <p className="mt-1 text-xs leading-5 text-[#8f887d]">{description}</p>
      </div>
      <div className="shrink-0">
        {children}
      </div>
    </div>
  )
}

function Toggle({ enabled = false }: { enabled?: boolean }) {
  return (
    <div className={`relative h-6 w-11 rounded-full transition ${enabled ? "bg-[#e65e48]" : "bg-white/10"}`}>
      <div className={`absolute top-0.5 size-5 rounded-full bg-white transition ${enabled ? "left-[22px]" : "left-0.5"}`} />
    </div>
  )
}

function GeneralSettings() {
  return (
    <SettingsSection icon={Globe} title="General" description="Organization and display settings">
      <SettingRow label="Organization name" description="Displayed across the studio and in communications.">
        <Input defaultValue="MindTrack Studio" className="h-10 w-64 border-white/10 bg-white/[0.035] text-sm text-[#eee6d8]" />
      </SettingRow>
      <SettingRow label="Studio URL" description="The public-facing URL for your studio instance.">
        <Input defaultValue="studio.mindtrack.io" className="h-10 w-64 border-white/10 bg-white/[0.035] text-sm text-[#eee6d8]" />
      </SettingRow>
      <SettingRow label="Default language" description="Primary language for content and interface.">
        <button className="flex h-10 w-48 items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-[#b7afa4]">
          English (US) <ChevronRight className="size-3" />
        </button>
      </SettingRow>
      <SettingRow label="Dark mode" description="Use dark theme across the admin interface.">
        <Toggle enabled />
      </SettingRow>
      <SettingRow label="Timezone" description="Used for scheduling and activity timestamps.">
        <button className="flex h-10 w-48 items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-[#b7afa4]">
          UTC+3 (AST) <ChevronRight className="size-3" />
        </button>
      </SettingRow>
    </SettingsSection>
  )
}

function AuthenticationSettings() {
  return (
    <SettingsSection icon={Lock} title="Authentication" description="Login providers and session configuration">
      <SettingRow label="Local role cookies" description="Currently using cookie-based role switching for development.">
        <span className="rounded border border-[#a8c764]/25 bg-[#a8c764]/10 px-3 py-1.5 text-xs text-[#a8c764]">Active</span>
      </SettingRow>
      <SettingRow label="AWS Cognito" description="Production JWT authentication with user pools and identity federation.">
        <span className="rounded border border-[#8f887d]/20 bg-white/[0.035] px-3 py-1.5 text-xs text-[#8f887d]">Not configured</span>
      </SettingRow>
      <SettingRow label="Session duration" description="How long user sessions remain valid before requiring re-auth.">
        <button className="flex h-10 w-48 items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-[#b7afa4]">
          7 days <ChevronRight className="size-3" />
        </button>
      </SettingRow>
      <SettingRow label="Two-factor auth" description="Require 2FA for admin accounts.">
        <Toggle />
      </SettingRow>
    </SettingsSection>
  )
}

function RolesSettings() {
  const roles = [
    { name: "Admin", permissions: "Full access", users: 2, color: "#e65e48" },
    { name: "Editor", permissions: "Create, edit, review content", users: 3, color: "#d4874b" },
    { name: "Viewer", permissions: "Read-only access", users: 3, color: "#8f887d" },
  ]

  return (
    <SettingsSection icon={Shield} title="Roles & access" description="Define permissions and access levels">
      {roles.map((role) => (
        <div key={role.name} className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div className="flex items-center gap-4">
            <span className="grid size-10 place-items-center rounded-md" style={{ backgroundColor: `${role.color}15` }}>
              <Users className="size-4" style={{ color: role.color }} />
            </span>
            <div>
              <p className="text-sm text-[#eee6d8]">{role.name}</p>
              <p className="mt-0.5 text-xs text-[#8f887d]">{role.permissions}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#8f887d]">{role.users} users</span>
            <button className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-[#d8cebd]">
              Configure
            </button>
          </div>
        </div>
      ))}
      <button className="mt-2 flex h-10 items-center gap-2 text-sm text-[#e65e48]">
        + Add custom role
      </button>
    </SettingsSection>
  )
}

function ContentRulesSettings() {
  return (
    <SettingsSection icon={Palette} title="Content rules" description="Publishing standards and editorial policies">
      <SettingRow label="Require review before publishing" description="All content must pass editorial review before going live.">
        <Toggle enabled />
      </SettingRow>
      <SettingRow label="Minimum readability score" description="Flesch-Kincaid score threshold for publishable content.">
        <Input defaultValue="60" type="number" className="h-10 w-24 border-white/10 bg-white/[0.035] text-center text-sm text-[#eee6d8]" />
      </SettingRow>
      <SettingRow label="Auto-archive after" description="Automatically archive content after period of inactivity.">
        <button className="flex h-10 w-48 items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-[#b7afa4]">
          90 days <ChevronRight className="size-3" />
        </button>
      </SettingRow>
      <SettingRow label="Evidence requirement" description="Require linked research sources for all published tools.">
        <Toggle enabled />
      </SettingRow>
    </SettingsSection>
  )
}

function NotificationSettings() {
  return (
    <SettingsSection icon={Bell} title="Notifications" description="Alert preferences and delivery channels">
      <SettingRow label="Email notifications" description="Receive email alerts for important studio events.">
        <Toggle enabled />
      </SettingRow>
      <SettingRow label="New feedback alerts" description="Get notified when users submit new feedback.">
        <Toggle enabled />
      </SettingRow>
      <SettingRow label="QA ticket updates" description="Alerts when QA tickets change status.">
        <Toggle enabled />
      </SettingRow>
      <SettingRow label="Weekly digest" description="Summary of studio activity sent every Monday.">
        <Toggle />
      </SettingRow>
      <SettingRow label="Notification email" description="Where studio alerts are delivered.">
        <Input defaultValue="admin@mindtrack.io" className="h-10 w-64 border-white/10 bg-white/[0.035] text-sm text-[#eee6d8]" />
      </SettingRow>
    </SettingsSection>
  )
}

function ApiSettings() {
  return (
    <SettingsSection icon={Key} title="API & integrations" description="External service connections and API keys">
      <SettingRow label="API key" description="Use this key to authenticate external API requests.">
        <div className="flex items-center gap-2">
          <Input defaultValue="mt_sk_••••••••••••••••" className="h-10 w-56 border-white/10 bg-white/[0.035] text-sm text-[#8f887d]" readOnly />
          <button className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-[#d8cebd]">
            Reveal
          </button>
        </div>
      </SettingRow>
      <div className="border-t border-white/10 pt-5">
        <p className="mb-4 text-sm text-[#eee6d8]">Connected services</p>
        <div className="space-y-3">
          {[
            { name: "GitHub Issues", status: "Not connected", icon: Zap, color: "#8f887d" },
            { name: "Notion", status: "Not connected", icon: Database, color: "#8f887d" },
            { name: "AWS Cognito", status: "Not connected", icon: Lock, color: "#8f887d" },
            { name: "Email (SMTP)", status: "Connected", icon: Mail, color: "#a8c764" },
          ].map((service) => (
            <div key={service.name} className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-center gap-3">
                <service.icon className="size-5" style={{ color: service.color }} />
                <div>
                  <p className="text-sm text-[#eee6d8]">{service.name}</p>
                  <p className="text-xs" style={{ color: service.color }}>{service.status}</p>
                </div>
              </div>
              <button className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-[#d8cebd]">
                {service.status === "Connected" ? "Configure" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SettingsSection>
  )
}
