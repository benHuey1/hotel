'use client';

import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input, Tabs, Tab } from "@nextui-org/react";
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  firstname: z.string().min(2),
  country: z.string().min(2),
  phoneNumber: z.string().min(6),
});

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register: registerLogin, handleSubmit: handleSubmitLogin } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const { register: registerSignup, handleSubmit: handleSubmitSignup } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const handleLogin = async (data: any) => {
    try {
      setIsLoading(true);
      setError("");
      
      const result = await signIn('credentials', {
        redirect: true,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError("Invalid credentials");
        return;
      }

      onSuccess();
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: any) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Auto login after registration
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      onSuccess();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="lg"
    >
      <ModalContent>
        <ModalHeader>
          <Tabs 
            selectedKey={tab} 
            onSelectionChange={(key) => setTab(key.toString())}
          >
            <Tab key="login" title="Connexion" />
            <Tab key="register" title="Inscription" />
          </Tabs>
        </ModalHeader>
        <ModalBody>
          {error && (
            <div className="bg-red-50 text-red-500 p-2 rounded mb-4">
              {error}
            </div>
          )}
          
          {tab === "login" ? (
            <form onSubmit={handleSubmitLogin(handleLogin)} className="space-y-4">
              <Input
                label="Email"
                {...registerLogin('email')}
              />
              <Input
                label="Mot de passe"
                type="password"
                {...registerLogin('password')}
              />
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                fullWidth
              >
                Se connecter
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitSignup(handleSignup)} className="space-y-4">
              <Input
                label="Nom"
                {...registerSignup('name')}
              />
              <Input
                label="Prénom"
                {...registerSignup('firstname')}
              />
              <Input
                label="Email"
                {...registerSignup('email')}
              />
              <Input
                label="Mot de passe"
                type="password"
                {...registerSignup('password')}
              />
              <Input
                label="Pays"
                {...registerSignup('country')}
              />
              <Input
                label="Téléphone"
                {...registerSignup('phoneNumber')}
              />
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                fullWidth
              >
                S'inscrire
              </Button>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}