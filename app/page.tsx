"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Zap, Check, ArrowDown, Sparkles } from "lucide-react";
import { COPY } from "@/lib/copy";
import { SUBSCRIPTION_PLANS } from "@/store/useSubscription";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const pricingRef = useRef<HTMLElement>(null);
  const [isPricingVisible, setIsPricingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPricingVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center justify-center space-y-6 py-12 md:py-16 px-4 slide-up">
        <div className="flex justify-center">
          <div className="relative">
            <ChefHat className="h-20 w-20 md:h-24 md:w-24 text-primary animate-in zoom-in duration-500" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          {COPY.landing.hero.title}
        </h1>
        
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          {COPY.landing.hero.subtitle}
        </p>


      </section>

      {/* How It Works */}
      <section className="space-y-1000 md:space-y-12 py-8 md:py-12 px-4 fade-in">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
          {COPY.landing.howItWorks.title}
        </h2>
        
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 md:gap-8">
          <Card className="hover:shadow-lg transition-all animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '0ms' }}>
            <CardHeader>
              <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary mx-auto ring-4 ring-primary/5 w-14 h-14 md:w-16 md:h-16 mb-3 md:mb-4">
                <span className="font-bold text-2xl md:text-3xl">1</span>
              </div>
              <CardTitle className="text-center text-lg md:text-xl">
                {COPY.landing.howItWorks.step1.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-sm md:text-base">
                {COPY.landing.howItWorks.step1.description}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary mx-auto ring-4 ring-primary/5 w-14 h-14 md:w-16 md:h-16 mb-3 md:mb-4">
                <span className="font-bold text-2xl md:text-3xl">2</span>
              </div>
              <CardTitle className="text-center text-lg md:text-xl">
                {COPY.landing.howItWorks.step2.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-sm md:text-base">
                {COPY.landing.howItWorks.step2.description}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all animate-in slide-in-from-bottom duration-500" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary mx-auto ring-4 ring-primary/5 w-14 h-14 md:w-16 md:h-16 mb-3 md:mb-4">
                <span className="font-bold text-2xl md:text-3xl">3</span>
              </div>
              <CardTitle className="text-center text-lg md:text-xl">
                {COPY.landing.howItWorks.step3.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-sm md:text-base">
                {COPY.landing.howItWorks.step3.description}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visual Separator */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative py-8 md:py-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-primary/20"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-primary shadow-lg animate-in zoom-in duration-500">
                <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 animate-in fade-in duration-700">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Gata să începi?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Alege planul perfect pentru obiectivele tale
            </p>
            
            <div className="flex justify-center pt-4 md:pt-6">
              <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        ref={pricingRef}
        className={cn(
          "space-y-8 md:space-y-12 py-8 md:py-12 px-4 transition-all duration-1000",
          isPricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
          {COPY.landing.pricing.title}
        </h2>
        
        <div className="mx-auto w-full max-w-6xl grid gap-6 md:grid-cols-3 md:gap-8">
          {/* Free Plan */}
          <Card
            className="transition-all duration-300 relative overflow-hidden group flex flex-col hover:shadow-lg hover:scale-[1.02] animate-in slide-in-from-bottom duration-500"
            style={{ animationDelay: '0ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="relative">
              <CardTitle className="text-xl md:text-2xl">
                {SUBSCRIPTION_PLANS.free.name}
              </CardTitle>
              <div className="font-bold text-3xl md:text-4xl mt-2">
                Gratuit
              </div>
              <CardDescription className="mt-2">
                Perfect pentru început
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative space-y-4 flex-1">
              <ul className="space-y-3">
                {SUBSCRIPTION_PLANS.free.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter className="relative pt-4">
              <Link href="/onboarding" className="w-full">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full gap-2 transition-all duration-200 group-hover:border-primary group-hover:text-primary"
                >
                  Începe gratuit
                  <Zap className="h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro Plan - EMPHASIZED */}
          <Card
            className="transition-all duration-300 relative overflow-hidden group flex flex-col border-primary border-2 shadow-xl hover:shadow-2xl hover:scale-105 animate-in slide-in-from-bottom duration-500"
            style={{ animationDelay: '100ms' }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <CardHeader className="relative">
              <Badge className="w-fit shadow-md text-sm px-3 py-1.5 mb-3">
                ⭐ Cel mai popular
              </Badge>
              
              <CardTitle className="text-xl md:text-2xl">
                {SUBSCRIPTION_PLANS.pro.name}
              </CardTitle>
              <div className="font-bold text-primary text-3xl md:text-4xl mt-2">
                {SUBSCRIPTION_PLANS.pro.price} RON
                <span className="font-normal text-muted-foreground text-base md:text-lg">
                  /lună
                </span>
              </div>
              
              <CardDescription className="mt-2">
                Trial gratuit 7 zile
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative space-y-4 flex-1">
              <ul className="space-y-3">
                {SUBSCRIPTION_PLANS.pro.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter className="relative pt-4">
              <Link href="/onboarding" className="w-full">
                <Button 
                  size="lg"
                  className="w-full gap-2 transition-all duration-300 shadow-xl hover:shadow-2xl group/btn"
                >
                  Activează trial 7 zile
                  <Zap className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Gourmet Plan */}
          <Card
            className="transition-all duration-300 relative overflow-hidden group flex flex-col border-amber-500/30 hover:shadow-xl hover:scale-[1.03] animate-in slide-in-from-bottom duration-500"
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="relative">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl md:text-2xl">
                  {SUBSCRIPTION_PLANS.gourmet.name}
                </CardTitle>
                <span className="text-xl md:text-2xl">👑</span>
              </div>
              <div className="font-bold text-3xl md:text-4xl mt-2">
                {SUBSCRIPTION_PLANS.gourmet.price} RON
                <span className="font-normal text-muted-foreground text-base md:text-lg">
                  /lună
                </span>
              </div>
              
              <CardDescription className="mt-2">
                Premium experience
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative space-y-4 flex-1">
              <ul className="space-y-3">
                {SUBSCRIPTION_PLANS.gourmet.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter className="relative pt-4">
              <Link href="/onboarding" className="w-full">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 transition-all duration-200 border-amber-500/50 hover:bg-amber-500/10 hover:border-amber-500"
                >
                  Activează trial 7 zile
                  <Zap className="h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 md:py-16 px-4 fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">De ce Mr. MealPrep?</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Rezultate reale, în timp real
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                  &lt;60s
                </div>
                <CardTitle className="text-lg md:text-xl">Onboarding rapid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  De la zero la plan complet în mai puțin de un minut
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                  ±5%
                </div>
                <CardTitle className="text-lg md:text-xl">Precizie perfectă</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Macro-nutrienți calculați cu precizie medicală
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                  3h
                </div>
                <CardTitle className="text-lg md:text-xl">Timp economisit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Per săptămână față de planificarea manuală
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
