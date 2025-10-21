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
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-16 slide-up">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <ChefHat className="h-20 w-20 text-primary animate-in zoom-in duration-500" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
        
        <h1 className="mb-6">
          {COPY.landing.hero.title}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {COPY.landing.hero.subtitle}
        </p>

        <Button
          variant="ghost"
          onClick={scrollToPricing}
          className="group mt-8 animate-bounce"
        >
          <ArrowDown className="h-5 w-5 text-primary group-hover:translate-y-1 transition-transform" />
        </Button>
      </section>

      {/* How It Works */}
      <section className="space-y-12 fade-in">
        <h2 className="text-center">
          {COPY.landing.howItWorks.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="animate-in slide-in-from-bottom duration-500 hover:shadow-lg transition-all" style={{ animationDelay: '0ms' }}>
            <CardHeader>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto ring-4 ring-primary/5">
                <span className="text-3xl font-bold">1</span>
              </div>
              <CardTitle className="text-center text-xl">
                {COPY.landing.howItWorks.step1.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                {COPY.landing.howItWorks.step1.description}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="animate-in slide-in-from-bottom duration-500 hover:shadow-lg transition-all" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto ring-4 ring-primary/5">
                <span className="text-3xl font-bold">2</span>
              </div>
              <CardTitle className="text-center text-xl">
                {COPY.landing.howItWorks.step2.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                {COPY.landing.howItWorks.step2.description}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="animate-in slide-in-from-bottom duration-500 hover:shadow-lg transition-all" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto ring-4 ring-primary/5">
                <span className="text-3xl font-bold">3</span>
              </div>
              <CardTitle className="text-center text-xl">
                {COPY.landing.howItWorks.step3.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                {COPY.landing.howItWorks.step3.description}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visual Separator */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto">
          <div className="relative py-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-primary/20"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background px-8 py-4 rounded-full border-2 border-primary shadow-lg animate-in zoom-in duration-500">
                <Sparkles className="h-7 w-7 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 animate-in fade-in duration-700">
            <h2 className="text-3xl md:text-4xl font-bold">
              Gata să începi?
            </h2>
            <p className="text-lg text-muted-foreground">
              Alege planul perfect pentru obiectivele tale
            </p>
            
            <div className="flex justify-center pt-6">
              <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        ref={pricingRef}
        className={cn(
          "space-y-12 py-8 transition-all duration-1000",
          isPricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <h2 className="text-center">{COPY.landing.pricing.title}</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card
            className={cn(
              "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden group",
              isPricingVisible && "animate-in slide-in-from-bottom duration-500"
            )}
            style={{ animationDelay: '0ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="relative">
              <CardTitle className="text-2xl">{SUBSCRIPTION_PLANS.free.name}</CardTitle>
              <div className="text-4xl font-bold mt-3 mb-2">
                Gratuit
              </div>
              <CardDescription>
                Perfect pentru început
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative space-y-4">
              <ul className="space-y-3">
                {SUBSCRIPTION_PLANS.free.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter className="relative pt-6">
              <Link href="/onboarding" className="w-full">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full gap-2 group-hover:border-primary group-hover:text-primary transition-all duration-200"
                >
                  Începe gratuit
                  <Zap className="h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro Plan - EMPHASIZED */}
          <Card
            className={cn(
              "transition-all duration-300 hover:shadow-2xl hover:scale-105 relative overflow-hidden group",
              "border-primary border-2 shadow-xl",
              isPricingVisible && "animate-in slide-in-from-bottom duration-500"
            )}
            style={{ animationDelay: '100ms' }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <CardHeader className="relative">
              <Badge className="w-fit mb-3 shadow-md text-sm px-3 py-1.5">
                ⭐ Cel mai popular
              </Badge>
              <CardTitle className="text-2xl">{SUBSCRIPTION_PLANS.pro.name}</CardTitle>
              <div className="text-4xl font-bold text-primary mt-3 mb-2">
                {SUBSCRIPTION_PLANS.pro.price} RON
                <span className="text-lg font-normal text-muted-foreground">/lună</span>
              </div>
              <CardDescription>
                Trial gratuit 7 zile
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative space-y-4">
              <ul className="space-y-3">
                {SUBSCRIPTION_PLANS.pro.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter className="relative pt-6">
              <Link href="/onboarding" className="w-full">
                <Button 
                  size="lg"
                  className="w-full gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 group/btn"
                >
                  Activează trial 7 zile
                  <Zap className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Gourmet Plan */}
          <Card
            className={cn(
              "transition-all duration-300 hover:shadow-xl hover:scale-[1.03] relative overflow-hidden group",
              "border-amber-500/30",
              isPricingVisible && "animate-in slide-in-from-bottom duration-500"
            )}
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="relative">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{SUBSCRIPTION_PLANS.gourmet.name}</CardTitle>
                <span className="text-2xl">👑</span>
              </div>
              <div className="text-4xl font-bold mt-3 mb-2">
                {SUBSCRIPTION_PLANS.gourmet.price} RON
                <span className="text-lg font-normal text-muted-foreground">/lună</span>
              </div>
              <CardDescription>
                Premium experience
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative space-y-4">
              <ul className="space-y-3">
                {SUBSCRIPTION_PLANS.gourmet.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter className="relative pt-6">
              <Link href="/onboarding" className="w-full">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 border-amber-500/50 hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-200"
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
      <section className="py-16 fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">De ce Mr. MealPrep?</h2>
            <p className="text-muted-foreground text-lg">
              Rezultate reale, în timp real
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl font-bold text-primary mb-3">
                  &lt;60s
                </div>
                <CardTitle className="text-lg">Onboarding rapid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  De la zero la plan complet în mai puțin de un minut
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl font-bold text-primary mb-3">
                  ±5%
                </div>
                <CardTitle className="text-lg">Precizie perfectă</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Macro-nutrienți calculați cu precizie medicală
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="text-5xl font-bold text-primary mb-3">
                  3h
                </div>
                <CardTitle className="text-lg">Timp economisit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
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
