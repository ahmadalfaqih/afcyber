"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, Activity, Book, Info, Globe } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "الصفحة الرئيسية", icon: Globe },
    { href: "/attack-map", label: "خريطة الهجمات", icon: Activity },
    { href: "/simulation-center", label: "مركز المحاكاة", icon: Shield },
    { href: "/glossary", label: "القاموس السيبراني", icon: Book },
    { href: "/advanced-mode", label: "محاكاة متقدمة", icon: Shield },
    { href: "/about", label: "من نحن", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo - Left Side */}
        <div className="hidden md:flex items-center">
          <Link href="/" className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg cyber-text">AF Cybersecurity</span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered White Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-md bg-white text-gray-800 font-medium shadow-sm hover:bg-gray-50 transition-all duration-200"
            >
              <item.icon className="h-4 w-4 text-gray-600" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">فتح القائمة</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[280px] sm:w-[320px] pr-0 pt-6">
            {/* Mobile Logo */}
            <div className="flex justify-center mb-8">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2.5 rtl:space-x-reverse"
              >
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg cyber-text">AF Cybersecurity</span>
              </Link>
            </div>

            {/* Mobile Nav - Centered & Full Width Buttons */}
            <nav className="flex flex-col items-center space-y-3 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full max-w-[260px] flex items-center justify-center space-x-3 rtl:space-x-reverse py-3 px-4 rounded-lg bg-white text-gray-800 font-medium shadow-sm hover:bg-gray-50 transition-all duration-200"
                >
                  <item.icon className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Mobile Logo Fallback */}
        <div className="flex md:hidden">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-lg cyber-text">AF Cybersecurity</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}