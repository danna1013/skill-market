/*
 * Design: Apple Vision Pro Spatial Glass
 * 404 page: Minimal dark glass panel with gradient accent
 */

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="text-center px-4 animate-fade-in-up">
          <div className="glass-panel glass-highlight max-w-md mx-auto p-10">
            {/* Large 404 */}
            <h1 className="font-display font-bold text-7xl gradient-text mb-4">
              404
            </h1>
            <h2 className="font-display font-semibold text-xl text-white mb-3">
              Page Not Found
            </h2>
            <p className="text-sm text-white/40 mb-8 leading-relaxed">
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
                className="bg-transparent border-white/10 text-white/60 hover:bg-white/5 hover:text-white rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
