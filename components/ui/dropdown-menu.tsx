'use client';

import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { ChevronDown } from 'lucide-react';
import { DropdownChoiceProps } from '@/types';

// interface DropdownChoiceProps {
//   items: Array<{
//     key: string;
//     label: string;
//     icon: React.ReactNode;
//   }>;
//   selectedKey: string;
//   onSelectionChange: (key: string) => void;
//   ariaLabel: string;
// }

export default function DropdownChoice({
  items,
  selectedKey,
  onSelectionChange,
  ariaLabel,
}: DropdownChoiceProps) {
  const selectedItem = items.find(item => item.key === selectedKey) || items[0];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="capitalize">
          {/* {selectedItem.icon} */}
          {/* {selectedItem.label} */}
          {selectedItem.key}
          <ChevronDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={ariaLabel}
        selectionMode="single"
        selectedKeys={[selectedKey]}
        onSelectionChange={(keys) => onSelectionChange(Array.from(keys)[0] as string)}
      >
        {items.map((item) => (
          <DropdownItem key={item.key} startContent={item.icon}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}