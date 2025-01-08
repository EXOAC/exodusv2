import React from 'react';
import { DropdownMenu, DropdownItem } from './DropdownMenu';

interface RichContentProps {
  content: string;
}

export default function RichContent({ content }: RichContentProps) {
  if (content.includes('<DropdownMenu')) {
    return (
      <DropdownMenu title="How to Inject">
        <DropdownItem 
          prefix="—"
          text="Ensure that the"
          suffix="overlay is active."
        />
        <DropdownItem 
          prefix="—"
          text="Download the loader."
        />
        <DropdownItem 
          prefix="—"
          text="Make sure that Rust is closed."
        />
        <DropdownItem 
          prefix="—"
          text="Open the loader, either from the local disk or from a USB drive."
        />
        <DropdownItem 
          prefix="—"
          text="Right-click to paste your license key."
        />
        <DropdownItem 
          prefix="—"
          text="Follow the instructions shown in the loader."
        />
        <DropdownItem 
          prefix="—"
          text="Upon the first injection, the PC will restart, after which a second injection is required."
        />
        <DropdownItem 
          prefix="—"
          text="Once the message box confirms a successful injection, you may start the game."
        />
        <DropdownItem 
          prefix="—"
          text="It is highly recommended to enable VSync in Rust."
        />
      </DropdownMenu>
    );
  }

  return (
    <div 
      className="space-y-4 text-[15px] leading-relaxed text-white/80"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}