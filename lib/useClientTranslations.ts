'use client';

import { useTranslations } from 'next-intl';

export function useClientTranslations(namespace: string) {
  return useTranslations(namespace);
}