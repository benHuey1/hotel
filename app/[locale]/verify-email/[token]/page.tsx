// /app/[locale]/verify-email/[token]/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function VerifyEmail({ params }: { params: { token: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Vérification de votre email en cours...');
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (verificationAttempted.current) return;
      verificationAttempted.current = true;
      try {
        console.log('Verifying with token:', params.token); // Debug
        console.log('RoomId:', roomId); // Debug

        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            token: params.token,
            roomId ,
          })
        });

        const data = await response.json();
        console.log('API Response:', data); // Debug

        // if (!response.ok) {
        if (!response.ok || !data.success) {
          setStatus('error');
          setMessage(data.message || 'Une erreur est survenue lors de la vérification');
          setTimeout(() => router.push('/'), 3000);
          return;
        }

        setStatus('success');
        setMessage('Email vérifié avec succès ! Redirection...');
        
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: data.user.email,
          // Ici, nous devrons peut-être gérer différemment le mot de passe
          // Une option serait de créer un token temporaire pour la première connexion
          callbackUrl: data.roomId && data.hotelId 
            ? `//hotels/${data.hotelId}/rooms/${data.roomId}`
            : `/`
        });

        if (signInResult?.error) {
          setStatus('error');
          setMessage('Erreur lors de la connexion automatique');
          setTimeout(() => router.push(`/`), 3000);
          return;
        }

        // Redirection simple pour commencer
        setTimeout(() => {
          console.log("Hotel ID", data.hotelId);
          console.log("Room ID", data.roomId);
          
          if (data.roomId && data.hotelId) {
            // router.push(`/booking/${data.roomId}`);
            router.push(`/hotels/${data.hotelId}/rooms/${roomId}`)
            // router.push('/');
          } else {
            router.push('/');
          }
        }, 2000);

      } catch (error) {
        console.error('Verification error:', error); // Debug
        setStatus('error');
        setMessage('Une erreur est survenue lors de la vérification');
        setTimeout(() => router.push('/'), 3000);
      }
    };

    verifyEmail();
  }, [params.token, roomId, router]);


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
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