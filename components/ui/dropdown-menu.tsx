'use client';
import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Button,
} from '@nextui-org/react';
import { EurIcon, GbpIcon, UsdIcon } from '../icons';
import { ChevronDown } from 'lucide-react';
import { DropdownChoiceProps } from '@/types';

// export default function DropdownChoice() {
//   const [selectedKeys, setSelectedKeys] = React.useState(new Set(["EUR"]));

//   const selectedValue = React.useMemo(
//     () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
//     [selectedKeys]
//   );
//   const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Button
//           variant="light"
//           className="capitalize"
//         >
//           {selectedValue}
//           <ChevronDown />
//         </Button>
//       </DropdownTrigger>
//       {}
//       <DropdownMenu
//         aria-label="Single selection example"
//         variant="flat"
//         disallowEmptySelection
//         selectionMode="single"
//         selectedKeys={selectedKeys}
//         onSelectionChange={setSelectedKeys}
//       >
//         <DropdownItem key="EUR" startContent={<EurIcon className={iconClasses}/>}>EUR</DropdownItem>
//         <DropdownItem key="GBP" startContent={<GbpIcon className={iconClasses}/>}>GBP</DropdownItem>
//         <DropdownItem key="USD" startContent={<UsdIcon className={iconClasses}/>}>USD</DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }

export default function DropdownChoice({ items }: DropdownChoiceProps) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([items[0].key]));

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
  };

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" className="capitalize">
          {selectedValue}
          <ChevronDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
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
