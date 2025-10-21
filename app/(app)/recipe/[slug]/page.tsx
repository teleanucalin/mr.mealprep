import { notFound } from "next/navigation";

import { getClientRecipeById, getClientRecipes } from "../../../../lib/clientData";
import Image from "next/image";

import { Badge } from "../../../../components/ui/Badge";
import { formatKcal, formatMacro } from "../../../../lib/format";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getClientRecipeById(slug);
  if (!recipe) {
    notFound();
  }

  return (
    <article className="mx-auto flex max-w-xl flex-col gap-5 rounded-3xl border border-[#e2e8f0] bg-white pb-6">
      <div className="relative h-64 w-full overflow-hidden rounded-b-3xl">
        <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-4 px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-[#0f172a]">{recipe.title}</h1>
          <p className="text-sm text-[#475569]">
            {recipe.timeMinutes} min • {recipe.costRON.toFixed(1)} lei • {formatKcal(recipe.nutrition.kcal)}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Proteine {formatMacro(recipe.nutrition.protein_g)}</Badge>
            <Badge variant="success">Carbo {formatMacro(recipe.nutrition.carbs_g)}</Badge>
            <Badge variant="success">Grăsimi {formatMacro(recipe.nutrition.fat_g)}</Badge>
            <Badge variant="info">Fibră {formatMacro(recipe.nutrition.fiber_g)}</Badge>
          </div>
        </header>
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[#0f172a]">Ingrediente</h2>
          <ul className="flex flex-col gap-2 text-sm text-[#475569]">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.name} className="flex items-center justify-between">
                <span>{ingredient.name}</span>
                <span>{ingredient.qty} {ingredient.unit}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[#0f172a]">Pași</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-[#475569]">
            {recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return getClientRecipes().map((recipe) => ({ slug: recipe.id }));
}

