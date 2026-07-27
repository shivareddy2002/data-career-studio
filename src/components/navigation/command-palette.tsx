import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { COMMAND_GROUPS } from "@/components/site/nav-config";
import { useUIStore } from "@/stores/ui-store";
import { useHotkey } from "@/hooks/use-hotkey";

export function CommandPalette() {
  const navigate = useNavigate();
  const open = useUIStore((s) => s.commandOpen);
  const setOpen = useUIStore((s) => s.setCommandOpen);
  const toggle = useUIStore((s) => s.toggleCommand);

  useHotkey(
    "k",
    useCallback(
      (event: KeyboardEvent) => {
        event.preventDefault();
        toggle();
      },
      [toggle],
    ),
    { meta: true },
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Search and navigate Data Career Studio"
    >
      <CommandInput placeholder="Search courses, labs, projects, pages…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {COMMAND_GROUPS.map((group) => (
          <CommandGroup key={group.title} heading={group.title}>
            {group.links.map((link) => (
              <CommandItem
                key={link.to + link.label}
                value={`${group.title} ${link.label}`}
                onSelect={() => {
                  setOpen(false);
                  navigate({ to: link.to });
                }}
              >
                {link.label}
                {link.description ? (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {link.description}
                  </span>
                ) : null}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}