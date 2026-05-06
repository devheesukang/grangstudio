'use client'

import { useEffect, useState } from 'react'
import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { useAdminDirtyGuard } from '@/hooks/useAdminDirtyGuard'
import type { ContentConfig } from '@/lib/adminContent'

type InfoConfig = ContentConfig['info']

export default function InfoAdminPage() {
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

  function updateInfo(key: keyof InfoConfig, value: string) {
    setConfig((prev) =>
      prev ? { ...prev, info: { ...prev.info, [key]: value } } : prev
    )
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

  const fields: { key: keyof InfoConfig; label: string; placeholder: string }[] = [
    {
      key: 'bio',
      label: 'Bio (one line)',
      placeholder: 'Visual storyteller based in Seoul, specializing in brand and content direction.',
    },
    { key: 'email', label: 'Email', placeholder: 'wolfkang0514@naver.com' },
    { key: 'phone', label: 'Phone', placeholder: '010-6401-0514' },
    { key: 'instagram', label: 'Instagram handle (no @)', placeholder: 'studio.grang' },
  ]

  return (
    <div className="w-full overflow-x-hidden">
      <AdminSaveBar title="Info" status={status} saving={saving} dirty={dirty} onSave={handleSave} />
      <main className="w-full max-w-2xl mx-auto px-4 py-8 sm:px-6 sm:py-10">

        <div className="flex flex-col gap-5">
          {fields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-[10px] text-neutral-500 tracking-widest uppercase block mb-2">
                {label}
              </label>
              <input
                type="text"
                value={config.info[key]}
                onChange={(e) => updateInfo(key, e.target.value)}
                placeholder={placeholder}
                className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 outline-none focus:border-neutral-600 placeholder:text-neutral-700 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Live preview */}
        <div className="mt-12 border-t border-neutral-800 pt-10">
          <p className="text-[10px] text-neutral-600 tracking-widest uppercase mb-6">Preview</p>
          <div className="text-neutral-400 text-sm leading-relaxed space-y-2">
            <p className="text-white text-lg">Kang Bosun</p>
            <p className="text-xs tracking-widest uppercase text-neutral-500">
              Photographer &amp; Video Director
            </p>
            <p className="text-sm mt-4">{config.info.bio}</p>
            <p className="text-sm mt-3" style={{ color: '#aaa' }}>{config.info.email}</p>
            <p className="text-sm" style={{ color: '#777' }}>{config.info.phone}</p>
            <p className="text-sm" style={{ color: '#777' }}>@{config.info.instagram}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
