// /app/[locale]/verify-email/[token]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function VerifyEmail({ params }: { params: { token: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Vérification de votre email en cours...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            token: params.token,
            roomId: roomId
          })
        });

        const data = await response.json();

        if (!response.ok) {
          setStatus('error');
          setMessage(data.message || 'Une erreur est survenue lors de la vérification');
          // Redirection vers la page d'accueil après 3 secondes en cas d'erreur
          setTimeout(() => router.push('/'), 3000);
          return;
        }

        // Si la vérification est réussie
        setStatus('success');
        setMessage('Email vérifié avec succès ! Redirection vers la page de réservation...');

        // Login automatique avec les credentials stockés dans le token de vérification
        if (data.email && data.password) {
          const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
          });

          if (result?.error) {
            setStatus('error');
            setMessage('Erreur lors de la connexion automatique');
            return;
          }
          
          // Redirection vers la page de réservation avec le roomId
          if (data.roomId) {
            // setTimeout(() => router.push(`/booking/${data.roomId}`), 2000);
        setMessage('Redirection avec succès, construction de la page Booking en cours !');
            setTimeout(() => router.push('/'), 2000);
          } else {
            setTimeout(() => router.push('/'), 2000);
          }
        }
      } catch (error) {
        setStatus('error');
        setMessage('Une erreur est survenue lors de la vérification');
        setTimeout(() => router.push('/'), 3000);
      }
    };

    verifyEmail();
  }, [params.token, roomId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérification en cours</h2>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="h-12 w-12 rounded-full bg-green-100 p-2 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Vérification réussie !</h2>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="h-12 w-12 rounded-full bg-red-100 p-2 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur</h2>
            </>
          )}
          
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
}