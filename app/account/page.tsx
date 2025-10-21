"use client";

import { useState } from "react";
import { useSubscription, SUBSCRIPTION_PLANS } from "@/store/useSubscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Check, Crown } from "lucide-react";
import { COPY } from "@/lib/copy";
import { useToast } from "@/components/ui/use-toast";
import { SubscriptionTier } from "@/lib/types";

export default function AccountPage() {
  const { toast } = useToast();
  const { currentTier, isAnnual, setTier, setIsAnnual } = useSubscription();
  const [quietHours, setQuietHours] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(true);

  const handleExportGroceryList = () => {
    // Mock export
    const content = "Lista de cumpărături\n\n- Piept de pui: 1.2 kg\n- Orez integral: 560g\n- Broccoli: 900g\n...";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lista-cumparaturi.txt";
    a.click();

    toast({
      title: "Listă exportată!",
      description: "Fișierul a fost descărcat",
    });
  };

  const handleChangeTier = (tier: SubscriptionTier) => {
    setTier(tier);
    toast({
      title: "Abonament actualizat!",
      description: `Ai trecut la planul ${SUBSCRIPTION_PLANS[tier].name}`,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{COPY.account.title}</h1>
      </div>

      <Tabs defaultValue="subscription">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscription">Abonament</TabsTrigger>
          <TabsTrigger value="preferences">Preferințe</TabsTrigger>
        </TabsList>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{COPY.account.subscription.title}</CardTitle>
                  <CardDescription>
                    Abonament curent: <strong>{SUBSCRIPTION_PLANS[currentTier].name}</strong>
                  </CardDescription>
                </div>
                <Badge
                  variant={currentTier === "free" ? "outline" : "default"}
                  className="gap-2"
                >
                  {currentTier !== "free" && <Crown className="h-3 w-3" />}
                  {SUBSCRIPTION_PLANS[currentTier].name}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="annual"
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                />
                <Label htmlFor="annual">
                  Facturare anuală (-20%)
                </Label>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {Object.values(SUBSCRIPTION_PLANS).map((plan) => {
                  const price = isAnnual ? plan.annualPrice : plan.price;
                  const isActive = plan.tier === currentTier;

                  return (
                    <Card
                      key={plan.tier}
                      className={isActive ? "border-primary" : ""}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <div className="text-2xl font-bold">
                          {price === 0 ? "Gratuit" : `${price} RON`}
                          {price > 0 && (
                            <span className="text-sm font-normal text-muted-foreground">
                              /{isAnnual ? "an" : "lună"}
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                              <Check className="h-3 w-3 text-success mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant={isActive ? "outline" : "default"}
                          className="w-full"
                          onClick={() => handleChangeTier(plan.tier)}
                          disabled={isActive}
                        >
                          {isActive ? "Activ" : "Selectează"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Features Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Caracteristici plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rețete/săptămână</span>
                  <span className="font-medium">
                    {SUBSCRIPTION_PLANS[currentTier].limits.recipesPerWeek}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profiluri</span>
                  <span className="font-medium">
                    {SUBSCRIPTION_PLANS[currentTier].limits.profiles}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Substituții smart</span>
                  <Badge variant={SUBSCRIPTION_PLANS[currentTier].limits.smartSubstitutions ? "success" : "outline"}>
                    {SUBSCRIPTION_PLANS[currentTier].limits.smartSubstitutions ? "Da" : "Nu"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lock macros</span>
                  <Badge variant={SUBSCRIPTION_PLANS[currentTier].limits.lockMacros ? "success" : "outline"}>
                    {SUBSCRIPTION_PLANS[currentTier].limits.lockMacros ? "Da" : "Nu"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Always-in-cart</span>
                  <Badge variant={SUBSCRIPTION_PLANS[currentTier].limits.alwaysInCart ? "success" : "outline"}>
                    {SUBSCRIPTION_PLANS[currentTier].limits.alwaysInCart ? "Da" : "Nu"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          {/* Brand & Health Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.account.preferences.title}</CardTitle>
              <CardDescription>
                Personalizează experiența ta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>
                  {COPY.account.preferences.brandPreferences}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {SUBSCRIPTION_PLANS[currentTier].limits.brandPreferences
                    ? "Disponibil în planul tău"
                    : "Disponibil doar în planul Gourmet"}
                </p>
                {SUBSCRIPTION_PLANS[currentTier].limits.brandPreferences && (
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Bio</Badge>
                    <Badge variant="outline">Local</Badge>
                    <Badge variant="outline">Vegan</Badge>
                    <Badge variant="outline">Gluten-free</Badge>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="quiet-hours">
                    {COPY.account.preferences.quietHours}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Nu trimite notificări între 21:00-08:00
                  </p>
                </div>
                <Switch
                  id="quiet-hours"
                  checked={quietHours}
                  onCheckedChange={setQuietHours}
                />
              </div>
            </CardContent>
          </Card>

          {/* Export */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.account.export.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleExportGroceryList}
                disabled={!SUBSCRIPTION_PLANS[currentTier].limits.exportGroceryList}
              >
                <Download className="h-4 w-4" />
                {COPY.account.export.cta}
              </Button>
              {!SUBSCRIPTION_PLANS[currentTier].limits.exportGroceryList && (
                <p className="text-xs text-muted-foreground mt-2">
                  Disponibil în planurile Pro și Gourmet
                </p>
              )}
            </CardContent>
          </Card>

          {/* GDPR */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.account.gdpr.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="gdpr"
                  checked={gdprConsent}
                  onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="gdpr"
                    className="text-sm font-normal leading-normal"
                  >
                    {COPY.account.gdpr.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Acceptă procesarea datelor conform RGPD pentru îmbunătățirea
                    serviciilor și recomandări personalizate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

