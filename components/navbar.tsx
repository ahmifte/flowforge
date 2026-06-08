import Link from "next/link";
import { Workflow, Settings } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b border-default">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Workflow className="h-5 w-5 text-accent" />
          flowforge
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2 rounded-md border border-default px-3 py-2 text-sm text-muted transition-colors hover:text-[hsl(var(--foreground))]"
        >
          <Settings className="h-4 w-4" />
          API key
        </Link>
      </nav>
    </header>
  );
}
