/*
 * Apple HIG 404
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
        <div className="text-center px-5 animate-fade-in-up">
          <div className="font-display font-bold text-[80px] sm:text-[120px] tracking-[-0.05em] leading-none mb-4" style={{ color: 'var(--text-faint)' }}>
            404
          </div>
          <h2 className="font-display font-semibold text-[20px] mb-2" style={{ color: 'var(--text-primary)' }}>
            Page Not Found
          </h2>
          <p className="text-[14px] mb-10" style={{ color: 'var(--text-muted)' }}>
            页面不存在或已被移除。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setLocation("/")}
              className="rounded-full px-6 text-[13px] font-medium"
              style={{ background: 'var(--text-primary)', color: 'var(--background)' }}
            >
              <Home className="w-4 h-4 mr-1.5" />
              回首页
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="rounded-full px-6 text-[13px] font-medium bg-transparent"
              style={{ border: '1px solid var(--divider)', color: 'var(--text-secondary)' }}
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              返回
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
