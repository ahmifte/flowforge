"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Trash2, Check } from "lucide-react";
import { STORAGE_KEYS } from "@/lib/storage";

export function ApiKeyManager() {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [hasStored, setHasStored] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEYS.apiKey) ?? "";
    setValue(stored);
    setHasStored(Boolean(stored));
  }, []);

  function save() {
    window.localStorage.setItem(STORAGE_KEYS.apiKey, value.trim());
    setHasStored(Boolean(value.trim()));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function clear() {
    window.localStorage.removeItem(STORAGE_KEYS.apiKey);
    setValue("");
    setHasStored(false);
  }

  return (
    <div className="max-w-xl rounded-xl border border-default bg-card p-6">
      <label htmlFor="key" className="block text-sm font-medium">
        OpenAI API key
      </label>
      <p className="mt-1 text-sm text-muted">
        Stored only in this browser via localStorage. It is sent with each run
        request and never saved on our servers.
      </p>
      <div className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <input
            id="key"
            type={reveal ? "text" : "password"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="sk-..."
            className="w-full rounded-md border border-default bg-transparent px-3 py-2 pr-10 font-mono text-sm outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="button"
            onClick={() => setReveal((r) => !r)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-[hsl(var(--foreground))]"
            aria-label={reveal ? "Hide key" : "Show key"}
          >
            {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <button
          type="button"
          onClick={save}
          className="inline-flex items-center gap-1 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          {saved ? <Check className="h-4 w-4" /> : null}
          {saved ? "Saved" : "Save"}
        </button>
        {hasStored ? (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1 rounded-md border border-default px-3 py-2 text-sm text-muted hover:text-red-400"
            aria-label="Clear key"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
