import { PrismaClient } from '@prisma/client';
import { Image, Select, SelectItem } from '@nextui-org/react';
import { PopoverCountriesProps } from '@/types';

const CountriesList: React.FC<PopoverCountriesProps> = ({
    countries,
    // setCountry,
    selectedCountry,
    setSelectedCountry,
    classNameTrigger,
    ...props
  }) => {
    return (
      <Select
        aria-label="Selection de l'hôtel"
        placeholder="Quel hôtel ?"
        onSelectionChange={(keys) => {
          const selectedId = Array.from(keys)[0] as string;
          const selected = countries.find((country) => country.id === selectedId);
          setSelectedCountry(selected || null);
        }}
        //   className={classNameTrigger}
        disableSelectorIconRotation
        selectorIcon={<Image src="/icon/home-red.png" width={30} height={30} />}
        startContent={<Image src="/icon/home-red.png" width={30} height={30} />}
        classNames={{
          label: 'group-data-[filled=true]:-translate-y-5',
          trigger: classNameTrigger,
          listboxWrapper: 'max-h-[400px]',
        }}
        listboxProps={{
          itemClasses: {
            base: [
              'text-default-500',
              'dark:text-white',
              'dak:[placeholder]:text-white',
              'data-[hover=true]:text-white',
              'data-[hover=true]:bg-[#FF5757]',
              'dark:data-[hover=true]:bg-[#FF5757]',
              'data-[selectable=true]:focus:bg-[#FF5757]',
              'data-[focus-visible=true]:ring-[#FF5757]',
            ],
          },
        }}
      >
        {countries.map((country) => (
          <SelectItem key={country.id} textValue={country.capital}>
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-small">{country.capital}</span>
                <span className="text-tiny opacity-80">{country.country}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </Select>
    );
  };
  
  export default CountriesList;