'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface BookingValidationModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  translations: {
    title: string;
    subtitle: string;
    rooms: string;
    adults: string;
    children: string;
    dates: string;
    cancel: string;
  };
}

export default function BookingValidationModal({
  isOpen,
  onOpenChange,
  translations
}: BookingValidationModalProps) {

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="md"
      className="dark:bg-gray-800"
    >
      <ModalContent>
        {(onClose) => (
          <>            
            <ModalBody className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">{translations.title}</h2>
              <p className="text-sm text-gray-500">{translations.subtitle}</p>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button 
                color="primary" 
                variant="ghost" 
                onPress={onClose}
              >
                {translations.cancel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}