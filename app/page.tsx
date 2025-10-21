"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Zap, ShoppingCart, Check } from "lucide-react";
import { COPY } from "@/lib/copy";
import { SUBSCRIPTION_PLANS } from "@/store/useSubscription";

export default function LandingPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="flex justify-center mb-4">
          <ChefHat className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {COPY.landing.hero.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {COPY.landing.hero.subtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/onboarding">
            <Button size="lg" className="gap-2">
              <Zap className="h-5 w-5" />
              {COPY.landing.hero.cta}
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">
          {COPY.landing.howItWorks.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <CardTitle>{COPY.landing.howItWorks.step1.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {COPY.landing.howItWorks.step1.description}
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <CardTitle>{COPY.landing.howItWorks.step2.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {COPY.landing.howItWorks.step2.description}
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <CardTitle>{COPY.landing.howItWorks.step3.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {COPY.landing.howItWorks.step3.description}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">
          {COPY.landing.pricing.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Free */}
          <Card>
            <CardHeader>
              <CardTitle>{SUBSCRIPTION_PLANS.free.name}</CardTitle>
              <div className="text-3xl font-bold">
                {SUBSCRIPTION_PLANS.free.price} RON
                <span className="text-sm font-normal text-muted-foreground">/lună</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {SUBSCRIPTION_PLANS.free.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/onboarding" className="w-full">
                <Button variant="outline" className="w-full">
                  {COPY.landing.pricing.free.cta}
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro */}
          <Card className="border-primary shadow-lg">
            <CardHeader>
              <Badge className="w-fit mb-2">Recomandat</Badge>
              <CardTitle>{SUBSCRIPTION_PLANS.pro.name}</CardTitle>
              <div className="text-3xl font-bold">
                {SUBSCRIPTION_PLANS.pro.price} RON
                <span className="text-sm font-normal text-muted-foreground">/lună</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {SUBSCRIPTION_PLANS.pro.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                {COPY.landing.pricing.pro.cta}
              </Button>
            </CardFooter>
          </Card>

          {/* Gourmet */}
          <Card>
            <CardHeader>
              <CardTitle>{SUBSCRIPTION_PLANS.gourmet.name}</CardTitle>
              <div className="text-3xl font-bold">
                {SUBSCRIPTION_PLANS.gourmet.price} RON
                <span className="text-sm font-normal text-muted-foreground">/lună</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {SUBSCRIPTION_PLANS.gourmet.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {COPY.landing.pricing.gourmet.cta}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center py-12 space-y-4">
        <h2 className="text-2xl font-bold">Gata să începi?</h2>
        <p className="text-muted-foreground">
          Creează-ți planul alimentar personalizat în mai puțin de 60 de secunde
        </p>
        <Link href="/onboarding">
          <Button size="lg">
            Începe acum
          </Button>
        </Link>
      </section>
    </div>
  );
}

