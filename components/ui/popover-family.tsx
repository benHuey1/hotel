import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Image } from '@nextui-org/react';

interface PopoverFamilyProps {
  // Define the expected props here
  classNameTrigger?: string;
  family: {
    adults: number;
    children: number;
  };
  setFamily: React.Dispatch<React.SetStateAction<{ adults: number; children: number }>>;
  personAdult: string;
  personChild: string;
  personPopup: string;
  // Other props...
}

const PopoverFamily: React.FC<PopoverFamilyProps> = ({
  classNameTrigger,
  family,
  setFamily,
  personAdult,
  personChild,
  personPopup,
  ...props
}) => {
  // const [adults, setAdults] = useState(0);
  // const [children, setChildren] = useState(0);

  // const handleSubmit = (event: Event) => {
  //   event.preventDefault();
  //   setAdults(adults);
  //   setChildren(children);
  // };
  return (
    <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger className={classNameTrigger}>
        <Button
          color="default"
          className="tap-highlight-revert dark:text-black"
          startContent={<Image src="/icon/family-red.png" width={30} height={30} />}
        >
          {family.adults} {personAdult} - {family.children} {personChild}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="w-full px-1 py-2">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              {personPopup}
            </p>
            <div className="mt-2 flex w-full flex-col gap-2"> 
              <form action="" className=" space-y-2">
                <Input
                  isRequired
                  type="number"
                  min={0}
                  max={6}
                  label={personAdult}
                  size="sm"
                  variant="bordered"
                  startContent={<Image src="/icon/adults.png" width={20} height={20} />}
                  value={`${family.adults}`}
                  onChange={(e) =>
                    setFamily((prev) => ({ ...prev, adults: parseInt(e.target.value) }))
                  }
                />
                <Input
                  type="number"
                  min={0}
                  max={6}
                  defaultValue="300px"
                  label={personChild}
                  size="sm"
                  variant="bordered"
                  startContent={<Image src="/icon/kids.png" width={20} height={20} />}
                  value={`${family.children}`}
                  onChange={(event) =>
                    setFamily((prev) => ({ ...prev, children: parseInt(event.target.value) }))
                  }
                />
                {/* <Button className="bg-[#FF5757] text-white" onClick={(event) => handleSubmit(event)}>Valider</Button> */}
              </form>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default PopoverFamily;
