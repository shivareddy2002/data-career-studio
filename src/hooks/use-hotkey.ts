import { useEffect } from "react";

/** Registers a global keyboard shortcut (e.g. meta+k). */
export function useHotkey(
  key: string,
  handler: (event: KeyboardEvent) => void,
  { meta = false }: { meta?: boolean } = {},
) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== key.toLowerCase()) return;
      if (meta && !(event.metaKey || event.ctrlKey)) return;
      handler(event);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, meta, handler]);
}