'use client'

type SaveStatus = 'idle' | 'saved' | 'error'

interface AdminSaveBarProps {
  title: string
  status: SaveStatus
  saving: boolean
  dirty: boolean
  onSave: () => void
}

export function AdminSaveBar({ title, status, saving, dirty, onSave }: AdminSaveBarProps) {
  return (
    <div className="sticky top-12 md:top-0 z-30 border-b border-neutral-800 bg-neutral-950/95 px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="truncate text-xs tracking-[0.5em] uppercase text-neutral-500">{title}</h1>
          {dirty && (
            <span className="shrink-0 text-[10px] tracking-widest uppercase text-amber-400">
              Unsaved
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {!dirty && status === 'saved' && (
            <span className="text-xs text-emerald-400 tracking-widest uppercase">Saved</span>
          )}
          {status === 'error' && (
            <span className="text-xs text-red-400 tracking-widest uppercase">Error</span>
          )}
          <button
            onClick={onSave}
            disabled={saving || !dirty}
            className="bg-white text-black text-xs font-medium px-5 py-2 tracking-widest uppercase hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
