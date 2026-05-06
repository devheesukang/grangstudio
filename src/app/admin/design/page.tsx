'use client'

import { useEffect, useState } from 'react'
import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { useAdminDirtyGuard } from '@/hooks/useAdminDirtyGuard'
import type { ContentConfig, Variant } from '@/lib/adminContent'

const VARIANTS: { id: Variant; name: string; font: string; accent: string; accentHex: string }[] = [
  { id: 'v1', name: 'Cinematic / Gold', font: 'Bebas Neue', accent: 'Gold', accentHex: '#C8A96E' },
  { id: 'v2', name: 'Embers / Copper', font: 'Bebas Neue', accent: 'Copper', accentHex: '#C1714A' },
  { id: 'v3', name: 'Slate / Contemporary', font: 'Syne', accent: 'Slate', accentHex: '#6B8CAE' },
]

export default function DesignAdminPage() {
  const [config, setConfig] = useState<ContentConfig | null>(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const { dirty, markSaved } = useAdminDirtyGuard(config)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data) => {
        setConfig(data)
        markSaved(data)
      })
  }, [markSaved])

  function selectVariant(v: Variant) {
    setConfig((prev) => (prev ? { ...prev, activeVariant: v } : prev))
  }

  async function handleSave() {
    if (!config) return
    setSaving(true)
    setStatus('idle')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      if (res.ok) {
        markSaved(config)
        setStatus('saved')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setSaving(false)
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  if (!config) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-xs text-neutral-500 tracking-widest uppercase">Loading…</span>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden">
      <AdminSaveBar title="Design Variant" status={status} saving={saving} dirty={dirty} onSave={handleSave} />
      <main className="w-full max-w-2xl mx-auto px-4 py-8 sm:px-6 sm:py-10">

        <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
          Select which design variant appears on the public site. Changes take effect immediately after saving.
        </p>

        <div className="flex flex-col gap-3">
          {VARIANTS.map((v) => {
            const active = config.activeVariant === v.id
            return (
              <button
                key={v.id}
                onClick={() => selectVariant(v.id)}
                className="flex min-w-0 items-center gap-4 border px-4 py-4 text-left transition-colors sm:gap-5 sm:px-5"
                style={{
                  borderColor: active ? 'white' : '#262626',
                  background: active ? '#111' : 'transparent',
                }}
              >
                {/* Accent swatch */}
                <div
                  className="w-4 h-4 shrink-0"
                  style={{ background: v.accentHex }}
                />

                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm tracking-wide"
                    style={{ color: active ? '#ffffff' : undefined }}
                  >
                    {v.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: active ? '#a3a3a3' : undefined }}
                  >
                    {v.font} — {v.accent}
                  </p>
                </div>

                <span
                  className="text-xs tracking-widest uppercase shrink-0"
                  style={{ color: active ? '#6ee7b7' : '#404040' }}
                >
                  {active ? 'Active' : v.id.toUpperCase()}
                </span>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
