"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Zap, Check, ArrowDown, Sparkles, ChevronRight, X } from "lucide-react";
import { COPY } from "@/lib/copy";
import { SUBSCRIPTION_PLANS } from "@/store/useSubscription";
import { cn } from "@/lib/utils";
import { ScrollSnap } from "@/components/ScrollSnap";
import { SubscriptionTier } from "@/lib/types";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [expandedPlan, setExpandedPlan] = useState<SubscriptionTier | null>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const [isPricingVisible, setIsPricingVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportHeight(window.innerHeight);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculează dimensiuni adaptive pentru mobil
  const cardHeight = isMobile && viewportHeight > 0 
    ? Math.floor((viewportHeight - 180) / 3.3) // 180px = titlu + spacing + bottom nav
    : 'auto';
  
  const titleSize = isMobile && viewportHeight < 700 ? "text-lg" : "text-xl";
  const priceSize = isMobile && viewportHeight < 700 ? "text-lg" : "text-xl";
  const buttonSize = isMobile && viewportHeight < 700 ? "h-8 text-xs" : "h-9";

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

  if (isMobile) {
    return (
      <ScrollSnap enabled className="-mx-4 -my-6 px-4 py-6">
        {/* Hero Section - Fullscreen pe mobil */}
        <section
          data-snap-section="true"
          className={cn(
            "text-center grid place-items-center min-h-[100dvh] snap-start snap-normal px-6"
          )}
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <ChefHat className={cn(
                "text-primary animate-in zoom-in duration-500",
                "h-24 w-24"
              )} />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full animate-pulse" />
            </div>
          </div>

          <h1 className={cn("mb-6 text-3xl text-balance")}>
            {COPY.landing.hero.title}
          </h1>

          <p className={cn(
            "text-muted-foreground max-w-2xl mx-auto text-balance text-base px-4"
          )}>
            {COPY.landing.hero.subtitle}
          </p>

          <div className="mt-12 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-sm text-muted-foreground">Scroll pentru mai multe</span>
            <ArrowDown className="h-6 w-6 text-primary" />
          </div>
        </section>

        {/* How It Works - Fullscreen pe mobil */}
        <section
          data-snap-section="true"
          className="min-h-[100dvh] snap-start snap-normal grid place-items-center px-6 pb-20"
        >
          <h2 className="text-center mb-8 text-2xl text-balance">
            {COPY.landing.howItWorks.title}
          </h2>

          <div className="space-y-4 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-all" style={{ animationDelay: '0ms' }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary mx-auto ring-4 ring-primary/5 w-12 h-12 mb-2">
                  <span className="font-bold text-2xl">1</span>
                </div>
                <CardTitle className="text-center text-base">
                  {COPY.landing.howItWorks.step1.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center text-xs">
                  {COPY.landing.howItWorks.step1.description}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all" style={{ animationDelay: '100ms' }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary mx-auto ring-4 ring-primary/5 w-12 h-12 mb-2">
                  <span className="font-bold text-2xl">2</span>
                </div>
                <CardTitle className="text-center text-base">
                  {COPY.landing.howItWorks.step2.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center text-xs">
                  {COPY.landing.howItWorks.step2.description}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all" style={{ animationDelay: '200ms' }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary mx-auto ring-4 ring-primary/5 w-12 h-12 mb-2">
                  <span className="font-bold text-2xl">3</span>
                </div>
                <CardTitle className="text-center text-base">
                  {COPY.landing.howItWorks.step3.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center text-xs">
                  {COPY.landing.howItWorks.step3.description}
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col items-center gap-2 mt-6 animate-bounce">
            <span className="text-xs text-muted-foreground">Continuă scroll</span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        </section>

        {/* Pricing Section - Fullscreen pe mobil */}
        <section
          data-snap-section="true"
          ref={pricingRef}
          className="min-h-[100dvh] snap-start snap-normal grid place-items-center px-6 pb-20"
          style={{ paddingTop: viewportHeight < 700 ? '1rem' : '1.5rem' }}
        >
          <h2 className={cn("text-center flex-shrink-0 text-balance", `${titleSize} mb-3`)}>
            {COPY.landing.pricing.title}
          </h2>

          <div className="mx-auto w-full space-y-2 flex-1 flex flex-col justify-center">
            {/* Free Plan */}
            <Card
              onClick={() => setExpandedPlan("free")}
              className={cn(
                "transition-all duration-300 relative overflow-hidden group flex-shrink-0 flex flex-col",
                "cursor-pointer hover:shadow-md active:scale-[0.98]"
              )}
              style={{ height: cardHeight, animationDelay: '0ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="relative flex-1 flex flex-col justify-center pb-1 pt-3">
                <CardTitle className={titleSize}>
                  {SUBSCRIPTION_PLANS.free.name}
                </CardTitle>
                <div className={cn("font-bold mt-1", priceSize)}>
                  Gratuit
                </div>
                <p className={cn("text-muted-foreground flex items-center gap-1 mt-1", viewportHeight < 700 ? "text-[10px]" : "text-xs")}>
                  Mai multe detalii
                  <ChevronRight className="h-3 w-3" />
                </p>
              </CardHeader>

              <CardFooter className="relative flex-shrink-0 pt-1 pb-3">
                <Link href="/onboarding" className="w-full" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={cn(
                      "w-full gap-2 transition-all duration-200",
                      viewportHeight < 700 ? "h-8 text-xs" : "h-9"
                    )}
                  >
                    Începe gratuit
                    <Zap className={viewportHeight < 700 ? "h-3 w-3" : "h-3.5 w-3.5"} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card
              onClick={() => setExpandedPlan("pro")}
              className={cn(
                "transition-all duration-300 relative overflow-hidden group flex-shrink-0 flex flex-col",
                "border-primary border-2 shadow-xl cursor-pointer hover:shadow-lg active:scale-[0.98]"
              )}
              style={{ height: cardHeight, animationDelay: '100ms' }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-500" />

              <CardHeader className="relative flex-1 flex flex-col justify-center pb-1 pt-3">
                <Badge className={cn("w-fit shadow-md mb-1", viewportHeight < 700 ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5")}>⭐ Cel mai popular</Badge>
                <CardTitle className={titleSize}>
                  {SUBSCRIPTION_PLANS.pro.name}
                </CardTitle>
                <div className={cn("font-bold text-primary mt-1", priceSize)}>
                  {SUBSCRIPTION_PLANS.pro.price} RON
                  <span className={cn("font-normal text-muted-foreground", viewportHeight < 700 ? "text-[10px]" : "text-xs")}>/lună</span>
                </div>
                <p className={cn("text-muted-foreground flex items-center gap-1 mt-1", viewportHeight < 700 ? "text-[10px]" : "text-xs")}>
                  Mai multe detalii
                  <ChevronRight className="h-3 w-3" />
                </p>
              </CardHeader>

              <CardFooter className="relative flex-shrink-0 pt-1 pb-3">
                <Link href="/onboarding" className="w-full" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    size="sm"
                    className={cn("w-full gap-2 transition-all duration-300", viewportHeight < 700 ? "h-8 text-xs" : "h-9")}
                  >
                    Activează trial 7 zile
                    <Zap className={viewportHeight < 700 ? "h-3 w-3" : "h-3.5 w-3.5"} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Gourmet Plan */}
            <Card
              onClick={() => setExpandedPlan("gourmet")}
              className={cn(
                "transition-all duration-300 relative overflow-hidden group flex-shrink-0 flex flex-col",
                "border-amber-500/30 cursor-pointer hover:shadow-md active:scale-[0.98]"
              )}
              style={{ height: cardHeight, animationDelay: '200ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative flex-1 flex flex-col justify-center pb-1 pt-3">
                <div className="flex items-center gap-2">
                  <CardTitle className={titleSize}>
                    {SUBSCRIPTION_PLANS.gourmet.name}
                  </CardTitle>
                  <span className={viewportHeight < 700 ? "text-base" : "text-lg"}>👑</span>
                </div>
                <div className={cn("font-bold mt-1", priceSize)}>
                  {SUBSCRIPTION_PLANS.gourmet.price} RON
                  <span className={cn("font-normal text-muted-foreground", viewportHeight < 700 ? "text-[10px]" : "text-xs")}>/lună</span>
                </div>
                <p className={cn("text-muted-foreground flex items-center gap-1 mt-1", viewportHeight < 700 ? "text-[10px]" : "text-xs")}>
                  Mai multe detalii
                  <ChevronRight className="h-3 w-3" />
                </p>
              </CardHeader>

              <CardFooter className="relative flex-shrink-0 pt-1 pb-3">
                <Link href="/onboarding" className="w-full" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="outline"
                    size="sm"
                    className={cn(
                      "w-full gap-2 transition-all duration-200 border-amber-500/50 hover:bg-amber-500/20 hover:border-amber-500",
                      viewportHeight < 700 ? "h-8 text-xs" : "h-9"
                    )}
                  >
                    Activează trial 7 zile
                    <Zap className={viewportHeight < 700 ? "h-3 w-3" : "h-3.5 w-3.5"} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Expanded details overlay - păstrat */}
        {expandedPlan && (
          <div className="fixed inset-0 z-50 bg-background animate-in slide-in-from-right duration-300">
            <div className="h-full overflow-y-auto pb-20">
              <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedPlan(null)}
                    className="gap-2"
                  >
                    ← Înapoi
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setExpandedPlan(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <Card className={cn("scale-in", expandedPlan === "pro" && "border-primary border-2")}> 
                  <CardHeader className="text-center">
                    {expandedPlan === "pro" && (
                      <Badge className="w-fit mx-auto mb-3">⭐ Cel mai popular</Badge>
                    )}
                    {expandedPlan === "gourmet" && (
                      <div className="mb-2 text-3xl">👑</div>
                    )}
                    <CardTitle className="text-3xl mb-3">
                      {SUBSCRIPTION_PLANS[expandedPlan].name}
                    </CardTitle>
                    <div className="text-4xl font-bold text-primary mb-2">
                      {SUBSCRIPTION_PLANS[expandedPlan].price === 0 ? "Gratuit" : `${SUBSCRIPTION_PLANS[expandedPlan].price} RON`}
                      {SUBSCRIPTION_PLANS[expandedPlan].price > 0 && (
                        <span className="text-base font-normal text-muted-foreground">/lună</span>
                      )}
                    </div>
                    {SUBSCRIPTION_PLANS[expandedPlan].price > 0 && (
                      <p className="text-sm text-muted-foreground">
                        sau {SUBSCRIPTION_PLANS[expandedPlan].annualPrice} RON/an (-20%)
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Ce primești:</h3>
                      <ul className="space-y-3">
                        {SUBSCRIPTION_PLANS[expandedPlan].features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm animate-in slide-in-from-left duration-300"
                            style={{ animationDelay: `${idx * 30}ms` }}
                          >
                            <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-3 text-sm">Detalii:</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rețete/săptămână</span>
                          <span className="font-semibold">{SUBSCRIPTION_PLANS[expandedPlan].limits.recipesPerWeek}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Profiluri</span>
                          <span className="font-semibold">{SUBSCRIPTION_PLANS[expandedPlan].limits.profiles}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Link href="/onboarding" className="w-full">
                      <Button size="lg" className="w-full gap-2 shadow-lg">
                        {expandedPlan === "free" ? "Începe gratuit" : "Activează trial 7 zile"}
                        <Zap className="h-5 w-5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        )}
      </ScrollSnap>
    );
  }

  // Desktop fallback: layout existent
  return (
    <div className={cn("space-y-24")}> 
      {/* Hero Section - Fullscreen pe mobil */}
      <section className={cn(
        "text-center grid place-items-center",
        isMobile ? "min-h-[100dvh] snap-start snap-normal px-6" : "space-y-8 py-16 slide-up"
      )}>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <ChefHat className={cn(
              "text-primary animate-in zoom-in duration-500",
              isMobile ? "h-24 w-24" : "h-20 w-20"
            )} />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
        
        <h1 className={cn("mb-6 text-balance", isMobile && "text-3xl")}>
          {COPY.landing.hero.title}
        </h1>
        
        <p className={cn(
          "text-muted-foreground max-w-2xl mx-auto text-balance",
          isMobile ? "text-base px-4" : "text-lg md:text-xl"
        )}>
          {COPY.landing.hero.subtitle}
        </p>

        {isMobile && (
          <div className="mt-12 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-sm text-muted-foreground">Scroll pentru mai multe</span>
            <ArrowDown className="h-6 w-6 text-primary" />
          </div>
        )}

        {!isMobile && (
          <Button
            variant="ghost"
            onClick={scrollToPricing}
            className="group mt-8 animate-bounce"
          >
            <ArrowDown className="h-5 w-5 text-primary group-hover:translate-y-1 transition-transform" />
          </Button>
        )}
      </section>

      {/* How It Works - Fullscreen pe mobil */}
      <section className={cn(
        isMobile 
          ? "min-h-[100dvh] snap-start snap-normal grid place-items-center px-6 pb-20" 
          : "space-y-12 fade-in"
      )}>
        <h2 className={cn("text-center mb-8 text-balance", isMobile && "text-2xl")}>
          {COPY.landing.howItWorks.title}
        </h2>
        
        <div className={cn(
          "max-w-5xl mx-auto",
          isMobile ? "space-y-4" : "grid md:grid-cols-3 gap-8"
        )}>
          <Card className={cn(
            "hover:shadow-lg transition-all",
            !isMobile && "animate-in slide-in-from-bottom duration-500"
          )} style={{ animationDelay: '0ms' }}>
            <CardHeader className={isMobile ? "pb-3" : ""}>
              <div className={cn(
                "flex items-center justify-center rounded-full bg-primary/10 text-primary mx-auto ring-4 ring-primary/5",
                isMobile ? "w-12 h-12 mb-2" : "w-16 h-16 mb-4"
              )}>
                <span className={cn("font-bold", isMobile ? "text-2xl" : "text-3xl")}>1</span>
              </div>
              <CardTitle className={cn("text-center", isMobile ? "text-base" : "text-xl")}>
                {COPY.landing.howItWorks.step1.title}
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "pt-0" : ""}>
              <CardDescription className={cn("text-center", isMobile ? "text-xs" : "text-base")}>
                {COPY.landing.howItWorks.step1.description}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className={cn(
            "hover:shadow-lg transition-all",
            !isMobile && "animate-in slide-in-from-bottom duration-500"
          )} style={{ animationDelay: '100ms' }}>
            <CardHeader className={isMobile ? "pb-3" : ""}>
              <div className={cn(
                "flex items-center justify-center rounded-full bg-primary/10 text-primary mx-auto ring-4 ring-primary/5",
                isMobile ? "w-12 h-12 mb-2" : "w-16 h-16 mb-4"
              )}>
                <span className={cn("font-bold", isMobile ? "text-2xl" : "text-3xl")}>2</span>
              </div>
              <CardTitle className={cn("text-center", isMobile ? "text-base" : "text-xl")}>
                {COPY.landing.howItWorks.step2.title}
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "pt-0" : ""}>
              <CardDescription className={cn("text-center", isMobile ? "text-xs" : "text-base")}>
                {COPY.landing.howItWorks.step2.description}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className={cn(
            "hover:shadow-lg transition-all",
            !isMobile && "animate-in slide-in-from-bottom duration-500"
          )} style={{ animationDelay: '200ms' }}>
            <CardHeader className={isMobile ? "pb-3" : ""}>
              <div className={cn(
                "flex items-center justify-center rounded-full bg-primary/10 text-primary mx-auto ring-4 ring-primary/5",
                isMobile ? "w-12 h-12 mb-2" : "w-16 h-16 mb-4"
              )}>
                <span className={cn("font-bold", isMobile ? "text-2xl" : "text-3xl")}>3</span>
              </div>
              <CardTitle className={cn("text-center", isMobile ? "text-base" : "text-xl")}>
                {COPY.landing.howItWorks.step3.title}
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? "pt-0" : ""}>
              <CardDescription className={cn("text-center", isMobile ? "text-xs" : "text-base")}>
                {COPY.landing.howItWorks.step3.description}
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {isMobile && (
          <div className="flex flex-col items-center gap-2 mt-6 animate-bounce">
            <span className="text-xs text-muted-foreground">Continuă scroll</span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        )}
      </section>

      {/* Visual Separator - Doar desktop */}
      {!isMobile && (
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
      )}

      {/* Pricing Section - Fullscreen pe mobil */}
      <section 
        ref={pricingRef}
        className={cn(
          isMobile 
            ? "min-h-[100dvh] snap-start snap-normal grid place-items-center px-6 pb-20"
            : "space-y-12 py-8 transition-all duration-1000",
          !isMobile && (isPricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")
        )}
        style={isMobile ? { paddingTop: viewportHeight < 700 ? '1rem' : '1.5rem' } : {}}
      >
        <h2 className={cn(
          "text-center flex-shrink-0 text-balance",
          isMobile ? `${titleSize} mb-3` : "mb-8"
        )}>
          {COPY.landing.pricing.title}
        </h2>
        
        <div className={cn(
          "mx-auto w-full",
          isMobile ? "space-y-2 flex-1 flex flex-col justify-center" : "grid md:grid-cols-3 gap-8 max-w-6xl"
        )}>
          {/* Free Plan */}
          <Card
            onClick={() => isMobile && setExpandedPlan("free")}
            className={cn(
              "transition-all duration-300 relative overflow-hidden group flex-shrink-0 flex flex-col",
              isMobile 
                ? "cursor-pointer hover:shadow-md active:scale-[0.98]"
                : "hover:shadow-lg hover:scale-[1.02]",
              !isMobile && isPricingVisible && "animate-in slide-in-from-bottom duration-500"
            )}
            style={isMobile ? { height: cardHeight, animationDelay: '0ms' } : { animationDelay: '0ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className={cn("relative flex-1 flex flex-col justify-center", isMobile && "pb-1 pt-3")}>
              <CardTitle className={isMobile ? titleSize : "text-2xl"}>
                {SUBSCRIPTION_PLANS.free.name}
              </CardTitle>
              <div className={cn("font-bold mt-1", isMobile ? priceSize : "text-4xl")}>
                Gratuit
              </div>
              
              {isMobile && (
                <p className={cn("text-muted-foreground flex items-center gap-1 mt-1", viewportHeight < 700 ? "text-[10px]" : "text-xs")}>
                  Mai multe detalii
                  <ChevronRight className="h-3 w-3" />
                </p>
              )}
              
              {!isMobile && (
                <CardDescription className="mt-2">
                  Perfect pentru început
                </CardDescription>
              )}
            </CardHeader>
            
            {!isMobile && (
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
            )}
            
            <CardFooter className={cn("relative flex-shrink-0", isMobile ? "pt-1 pb-3" : "pt-4")}>
              <Link href="/onboarding" className="w-full" onClick={(e) => isMobile && e.stopPropagation()}>
                <Button 
                  variant="outline" 
                  size={isMobile ? "sm" : "lg"}
                  className={cn(
                    "w-full gap-2 transition-all duration-200",
                    isMobile 
                      ? `hover:bg-primary hover:text-primary-foreground ${buttonSize}`
                      : "group-hover:border-primary group-hover:text-primary"
                  )}
                >
                  Începe gratuit
                  <Zap className={isMobile && viewportHeight < 700 ? "h-3 w-3" : isMobile ? "h-3.5 w-3.5" : "h-5 w-5"} />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro Plan - EMPHASIZED */}
          <Card
            onClick={() => isMobile && setExpandedPlan("pro")}
            className={cn(
              "transition-all duration-300 relative overflow-hidden group flex-shrink-0 flex flex-col",
              "border-primary border-2 shadow-xl",
              isMobile
                ? "cursor-pointer hover:shadow-lg active:scale-[0.98]"
                : "hover:shadow-2xl hover:scale-105",
              !isMobile && isPricingVisible && "animate-in slide-in-from-bottom duration-500"
            )}
            style={isMobile ? { height: cardHeight, animationDelay: '100ms' } : { animationDelay: '100ms' }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-500" />
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            )}
            
            <CardHeader className={cn("relative flex-1 flex flex-col justify-center", isMobile && "pb-1 pt-3")}>
              <Badge className={cn(
                "w-fit shadow-md mb-1",
                isMobile && viewportHeight < 700 ? "text-[9px] px-1.5 py-0.5" : isMobile ? "text-[10px] px-2 py-0.5" : "text-sm px-3 py-1.5 mb-3"
              )}>
                ⭐ Cel mai popular
              </Badge>
              
              <CardTitle className={isMobile ? titleSize : "text-2xl"}>
                {SUBSCRIPTION_PLANS.pro.name}
              </CardTitle>
              <div className={cn("font-bold text-primary mt-1", isMobile ? priceSize : "text-4xl")}>
                {SUBSCRIPTION_PLANS.pro.price} RON
                <span className={cn("font-normal text-muted-foreground", isMobile && viewportHeight < 700 ? "text-[10px]" : isMobile ? "text-xs" : "text-lg")}>
                  /lună
                </span>
              </div>
              
              {isMobile && (
                <p className={cn("text-muted-foreground flex items-center gap-1 mt-1", viewportHeight < 700 ? "text-[10px]" : "text-xs")}>
                  Mai multe detalii
                  <ChevronRight className="h-3 w-3" />
                </p>
              )}
              
              {!isMobile && (
                <CardDescription className="mt-2">
                  Trial gratuit 7 zile
                </CardDescription>
              )}
            </CardHeader>
            
            {!isMobile && (
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
            )}
            
            <CardFooter className={cn("relative flex-shrink-0", isMobile ? "pt-1 pb-3" : "pt-4")}>
              <Link href="/onboarding" className="w-full" onClick={(e) => isMobile && e.stopPropagation()}>
                <Button 
                  size={isMobile ? "sm" : "lg"}
                  className={cn(
                    "w-full gap-2 transition-all duration-300",
                    isMobile 
                      ? `shadow-md hover:shadow-lg ${buttonSize}`
                      : "shadow-xl hover:shadow-2xl group/btn"
                  )}
                >
                  Activează trial 7 zile
                  <Zap className={cn(
                    isMobile && viewportHeight < 700 ? "h-3 w-3" : isMobile ? "h-3.5 w-3.5" : "h-5 w-5",
                    !isMobile && "group-hover/btn:scale-110 transition-transform"
                  )} />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Gourmet Plan */}
          <Card
            onClick={() => isMobile && setExpandedPlan("gourmet")}
            className={cn(
              "transition-all duration-300 relative overflow-hidden group flex-shrink-0 flex flex-col",
              "border-amber-500/30",
              isMobile
                ? "cursor-pointer hover:shadow-md active:scale-[0.98]"
                : "hover:shadow-xl hover:scale-[1.03]",
              !isMobile && isPricingVisible && "animate-in slide-in-from-bottom duration-500"
            )}
            style={isMobile ? { height: cardHeight, animationDelay: '200ms' } : { animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className={cn("relative flex-1 flex flex-col justify-center", isMobile && "pb-1 pt-3")}>
              <div className="flex items-center gap-2">
                <CardTitle className={isMobile ? titleSize : "text-2xl"}>
                  {SUBSCRIPTION_PLANS.gourmet.name}
                </CardTitle>
                <span className={isMobile && viewportHeight < 700 ? "text-base" : isMobile ? "text-lg" : "text-2xl"}>👑</span>
              </div>
              <div className={cn("font-bold mt-1", isMobile ? priceSize : "text-4xl")}>
                {SUBSCRIPTION_PLANS.gourmet.price} RON
                <span className={cn("font-normal text-muted-foreground", isMobile && viewportHeight < 700 ? "text-[10px]" : isMobile ? "text-xs" : "text-lg")}>
                  /lună
                </span>
              </div>
              
              {isMobile && (
                <p className={cn("text-muted-foreground flex items-center gap-1 mt-1", viewportHeight < 700 ? "text-[10px]" : "text-xs")}>
                  Mai multe detalii
                  <ChevronRight className="h-3 w-3" />
                </p>
              )}
              
              {!isMobile && (
                <CardDescription className="mt-2">
                  Premium experience
                </CardDescription>
              )}
            </CardHeader>
            
            {!isMobile && (
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
            )}
            
            <CardFooter className={cn("relative flex-shrink-0", isMobile ? "pt-1 pb-3" : "pt-4")}>
              <Link href="/onboarding" className="w-full" onClick={(e) => isMobile && e.stopPropagation()}>
                <Button 
                  variant="outline"
                  size={isMobile ? "sm" : "lg"}
                  className={cn(
                    "w-full gap-2 transition-all duration-200",
                    isMobile
                      ? `border-amber-500/50 hover:bg-amber-500/20 hover:border-amber-500 ${buttonSize}`
                      : "border-amber-500/50 hover:bg-amber-500/10 hover:border-amber-500"
                  )}
                >
                  Activează trial 7 zile
                  <Zap className={isMobile && viewportHeight < 700 ? "h-3 w-3" : isMobile ? "h-3.5 w-3.5" : "h-5 w-5"} />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Expanded Plan Details - Mobile Fullscreen */}
      {isMobile && expandedPlan && (
        <div className="fixed inset-0 z-50 bg-background animate-in slide-in-from-right duration-300">
          <div className="h-full overflow-y-auto pb-20">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedPlan(null)}
                  className="gap-2"
                >
                  ← Înapoi
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpandedPlan(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Card className={cn(
                "scale-in",
                expandedPlan === "pro" && "border-primary border-2"
              )}>
                <CardHeader className="text-center">
                  {expandedPlan === "pro" && (
                    <Badge className="w-fit mx-auto mb-3">⭐ Cel mai popular</Badge>
                  )}
                  {expandedPlan === "gourmet" && (
                    <div className="mb-2 text-3xl">👑</div>
                  )}
                  
                  <CardTitle className="text-3xl mb-3">
                    {SUBSCRIPTION_PLANS[expandedPlan].name}
                  </CardTitle>
                  
                  <div className="text-4xl font-bold text-primary mb-2">
                    {SUBSCRIPTION_PLANS[expandedPlan].price === 0 
                      ? "Gratuit" 
                      : `${SUBSCRIPTION_PLANS[expandedPlan].price} RON`}
                    {SUBSCRIPTION_PLANS[expandedPlan].price > 0 && (
                      <span className="text-base font-normal text-muted-foreground">/lună</span>
                    )}
                  </div>
                  
                  {SUBSCRIPTION_PLANS[expandedPlan].price > 0 && (
                    <p className="text-sm text-muted-foreground">
                      sau {SUBSCRIPTION_PLANS[expandedPlan].annualPrice} RON/an (-20%)
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Ce primești:</h3>
                    <ul className="space-y-3">
                      {SUBSCRIPTION_PLANS[expandedPlan].features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm animate-in slide-in-from-left duration-300"
                          style={{ animationDelay: `${idx * 30}ms` }}
                        >
                          <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3 text-sm">Detalii:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rețete/săptămână</span>
                        <span className="font-semibold">{SUBSCRIPTION_PLANS[expandedPlan].limits.recipesPerWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Profiluri</span>
                        <span className="font-semibold">{SUBSCRIPTION_PLANS[expandedPlan].limits.profiles}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Link href="/onboarding" className="w-full">
                    <Button 
                      size="lg"
                      className={cn(
                        "w-full gap-2 shadow-lg",
                        expandedPlan === "pro" && "shadow-xl"
                      )}
                    >
                      {expandedPlan === "free" ? "Începe gratuit" : "Activează trial 7 zile"}
                      <Zap className="h-5 w-5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Social Proof - Doar desktop */}
      {!isMobile && (
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
      )}
    </div>
  );
}
