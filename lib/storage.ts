// Local-only storage keys. Everything flowforge persists lives in the browser,
// never on a server. This keeps the BYO-key promise and avoids handling secrets.
export const STORAGE_KEYS = {
  apiKey: "flowforge.openai_key",
  history: "flowforge.history",
} as const;

export type RunRecord = {
  id: string;
  workflowId: string;
  workflowName: string;
  input: Record<string, string>;
  output: string;
  createdAt: number;
};

export function loadHistory(): RunRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.history);
    return raw ? (JSON.parse(raw) as RunRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveRun(record: RunRecord): RunRecord[] {
  const history = [record, ...loadHistory()].slice(0, 25);
  window.localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
  return history;
}
