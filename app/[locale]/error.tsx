'use client';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Oups, une erreur est survenue !</h2>
      <Button
        className="bg-primary text-white"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Raffraichir
      </Button>
      <Link className="bg-tertiary px-4 py-2 font-bold text-white hover:bg-gray-500" href='/'>
        Accueil
      </Link>
    </div>
  );
}
