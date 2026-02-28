/*
 * Design: Apple-style dual theme
 * 404 page
 */

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16 pb-16">
        <div className="text-center px-4 animate-fade-in-up">
          <div className="glass-panel glass-highlight max-w-md mx-auto p-10">
            <h1 className="font-display font-bold text-7xl gradient-text mb-4">
              404
            </h1>
            <h2 className="font-display font-semibold text-xl mb-3" style={{ color: 'var(--text-primary)' }}>
              Page Not Found
            </h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => setLocation("/")}
                className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] text-white border-0 rounded-xl shadow-lg shadow-[#007AFF]/20"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="rounded-xl"
                style={{ background: 'transparent', border: '1px solid var(--divider)', color: 'var(--text-secondary)' }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
