import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Image } from '@nextui-org/react';

interface PopoverRoomProps {
  // Define the expected props here
  classNameTrigger?: string;
  room: number;
  setRoom: React.Dispatch<React.SetStateAction<number>>;
  // Other props...
}

const PopoverRoom: React.FC<PopoverRoomProps> = ({ classNameTrigger, room, setRoom, ...props }) => {
  return (
    <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger className={classNameTrigger}>
        <Button
          color="default"
          className="text-default-foregrounddata tap-highlight-revert dark:text-black"
          startContent={<Image src="icon/sleeping-red.png" width={50} height={60} />}
        >
          {room} chambres
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        {(titleProps) => (
          <div className="w-full px-1 py-2">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Nombre de chambres
            </p>
            <div className="mt-2 flex w-full flex-col gap-2">
              <form action="" className=" space-y-2">
                <Input
                  isRequired
                  type="number"
                  min={0}
                  max={5}
                  label="Chambres"
                  size="sm"
                  variant="bordered"
                  value={`${room}`}
                  onChange={(event) => setRoom(parseInt(event.target.value))}
                />
              </form>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default PopoverRoom;
