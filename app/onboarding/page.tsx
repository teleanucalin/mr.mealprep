"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/store/useOnboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COPY } from "@/lib/copy";
import { Allergen } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

const ALLERGENS: Allergen[] = [
  "gluten",
  "lactose",
  "nuts",
  "eggs",
  "soy",
  "fish",
  "shellfish",
  "peanuts",
];

const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: "Gluten",
  lactose: "Lactoză",
  nuts: "Nuci",
  eggs: "Ouă",
  soy: "Soia",
  fish: "Pește",
  shellfish: "Fructe de mare",
  peanuts: "Arahide",
};

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, updateProfile, complete } = useOnboarding();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("basics");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateBasics = () => {
    const newErrors: Record<string, string> = {};

    if (!profile.age || profile.age < 16 || profile.age > 80) {
      newErrors.age = "Vârsta trebuie să fie între 16 și 80 de ani";
    }
    if (!profile.sex) {
      newErrors.sex = "Selectează sexul";
    }
    if (!profile.weight || profile.weight < 30 || profile.weight > 200) {
      newErrors.weight = "Greutatea trebuie să fie între 30 și 200 kg";
    }
    if (!profile.height || profile.height < 130 || profile.height > 220) {
      newErrors.height = "Înălțimea trebuie să fie între 130 și 220 cm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateGoals = () => {
    const newErrors: Record<string, string> = {};

    if (!profile.objective) {
      newErrors.objective = "Selectează un obiectiv";
    }
    if (!profile.activityLevel) {
      newErrors.activityLevel = "Selectează nivelul de activitate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentTab === "basics" && validateBasics()) {
      setCurrentTab("goals");
    } else if (currentTab === "goals" && validateGoals()) {
      setCurrentTab("preferences");
    }
  };

  const handleBack = () => {
    if (currentTab === "goals") {
      setCurrentTab("basics");
    } else if (currentTab === "preferences") {
      setCurrentTab("goals");
    }
  };

  const handleSubmit = () => {
    if (!validateBasics() || !validateGoals()) {
      toast({
        title: "Eroare validare",
        description: "Completează toate câmpurile obligatorii",
        variant: "destructive",
      });
      setCurrentTab("basics");
      return;
    }

    complete();
    toast({
      title: "Profil creat!",
      description: "Pregătim planul tău personalizat...",
    });

    router.push("/plan");
  };

  const toggleAllergen = (allergen: Allergen) => {
    const current = profile.allergens || [];
    const updated = current.includes(allergen)
      ? current.filter((a) => a !== allergen)
      : [...current, allergen];
    updateProfile({ allergens: updated });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{COPY.onboarding.title}</CardTitle>
          <CardDescription>{COPY.onboarding.subtitle}</CardDescription>
        </CardHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basics">Date de bază</TabsTrigger>
            <TabsTrigger value="goals">Obiective</TabsTrigger>
            <TabsTrigger value="preferences">Preferințe</TabsTrigger>
          </TabsList>

          {/* Tab: Basics */}
          <TabsContent value="basics">
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">{COPY.onboarding.fields.age.label}</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={profile.age || ""}
                    onChange={(e) => updateProfile({ age: parseInt(e.target.value) })}
                  />
                  {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sex">{COPY.onboarding.fields.sex.label}</Label>
                  <Select
                    value={profile.sex}
                    onValueChange={(value) => updateProfile({ sex: value as "M" | "F" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculin</SelectItem>
                      <SelectItem value="F">Feminin</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sex && <p className="text-xs text-destructive">{errors.sex}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">{COPY.onboarding.fields.weight.label}</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={profile.weight || ""}
                    onChange={(e) => updateProfile({ weight: parseFloat(e.target.value) })}
                  />
                  {errors.weight && <p className="text-xs text-destructive">{errors.weight}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">{COPY.onboarding.fields.height.label}</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={profile.height || ""}
                    onChange={(e) => updateProfile({ height: parseInt(e.target.value) })}
                  />
                  {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
                </div>
              </div>
            </CardContent>
          </TabsContent>

          {/* Tab: Goals */}
          <TabsContent value="goals">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label>{COPY.onboarding.fields.objective.label}</Label>
                <Select
                  value={profile.objective}
                  onValueChange={(value) =>
                    updateProfile({ objective: value as "cut" | "maintain" | "bulk" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează obiectiv" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cut">Slăbire (deficit caloric)</SelectItem>
                    <SelectItem value="maintain">Menținere</SelectItem>
                    <SelectItem value="bulk">Masă musculară (surplus)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.objective && (
                  <p className="text-xs text-destructive">{errors.objective}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Ritm: {profile.pace || 0}%</Label>
                <Slider
                  value={[profile.pace || 0]}
                  onValueChange={(value) => updateProfile({ pace: value[0] })}
                  min={-20}
                  max={20}
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  Negativ = deficit, Pozitiv = surplus
                </p>
              </div>

              <div className="space-y-2">
                <Label>{COPY.onboarding.fields.activityLevel.label}</Label>
                <Select
                  value={profile.activityLevel}
                  onValueChange={(value) =>
                    updateProfile({
                      activityLevel: value as "sedentary" | "light" | "moderate" | "active" | "very_active",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentar</SelectItem>
                    <SelectItem value="light">Ușor activ</SelectItem>
                    <SelectItem value="moderate">Moderat activ</SelectItem>
                    <SelectItem value="active">Activ</SelectItem>
                    <SelectItem value="very_active">Foarte activ</SelectItem>
                  </SelectContent>
                </Select>
                {errors.activityLevel && (
                  <p className="text-xs text-destructive">{errors.activityLevel}</p>
                )}
              </div>
            </CardContent>
          </TabsContent>

          {/* Tab: Preferences */}
          <TabsContent value="preferences">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label>{COPY.onboarding.fields.allergens.label}</Label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGENS.map((allergen) => (
                    <Badge
                      key={allergen}
                      variant={
                        profile.allergens?.includes(allergen) ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => toggleAllergen(allergen)}
                    >
                      {ALLERGEN_LABELS[allergen]}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mese pe zi: {profile.mealsPerDay || 3}</Label>
                  <Slider
                    value={[profile.mealsPerDay || 3]}
                    onValueChange={(value) => updateProfile({ mealsPerDay: value[0] })}
                    min={2}
                    max={5}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Timp gătit: {profile.cookingTime || 30} min</Label>
                  <Slider
                    value={[profile.cookingTime || 30]}
                    onValueChange={(value) => updateProfile({ cookingTime: value[0] })}
                    min={10}
                    max={60}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Buget/porție: {profile.budgetPerServing || 20} RON</Label>
                  <Slider
                    value={[profile.budgetPerServing || 20]}
                    onValueChange={(value) => updateProfile({ budgetPerServing: value[0] })}
                    min={10}
                    max={60}
                    step={5}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="batch-cooking">Batch cooking</Label>
                  <Switch
                    id="batch-cooking"
                    checked={profile.batchCooking || false}
                    onCheckedChange={(checked) => updateProfile({ batchCooking: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentTab === "basics"}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Înapoi
          </Button>

          {currentTab === "preferences" ? (
            <Button onClick={handleSubmit}>
              Calculează planul →
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Continuă
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

