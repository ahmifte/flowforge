import type { Metadata } from "next";
import { ApiKeyManager } from "@/components/api-key-manager";

export const metadata: Metadata = {
  title: "API key",
  description: "Manage your OpenAI API key. Stored only in your browser.",
};

export default function SettingsPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mb-8 max-w-xl text-muted">
        flowforge is bring-your-own-key. Add your OpenAI key below to run
        workflows. It never leaves your browser except to make the model request
        on your behalf.
      </p>
      <ApiKeyManager />
    </div>
  );
}
