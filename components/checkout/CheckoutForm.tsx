"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../ui/Button";
import { useUIStore } from "../../lib/state/uiStore";

const schema = z.object({
  name: z.string().min(3, "Introduce un nume"),
  email: z.string().email("Email invalid"),
  phone: z
    .string()
    .min(9, "Telefon invalid")
    .max(15),
  address: z.string().min(10, "Adresă prea scurtă"),
  deliveryWindow: z.enum(["Sâmbătă 10–13", "Duminică 09–12", "Luni 18–20"]),
  paymentMethod: z.enum(["card", "cash", "transfer"]),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  name: "Alex Strong",
  email: "alex@example.com",
  phone: "0722123456",
  address: "Str. Fit 10, București",
  deliveryWindow: "Sâmbătă 10–13",
  paymentMethod: "card",
};

type CheckoutFormProps = {
  onConfirm: (data: FormValues) => void;
};

export function CheckoutForm({ onConfirm }: CheckoutFormProps) {
  const addToast = useUIStore((state) => state.addToast);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const submit = handleSubmit((values) => {
    addToast({
      id: `checkout-${Date.now()}`,
      title: "Date salvate",
      description: "Confirmă comanda pentru a continua",
    });
    onConfirm(values);
  });

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 rounded-3xl border border-[#e2e8f0] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#0f172a]">Date de livrare</h2>
      <div className="grid gap-4">
        <label className="flex flex-col gap-2 text-sm text-[#0f172a]">
          Nume complet
          <input
            type="text"
            {...register("name")}
            className="h-11 rounded-xl border border-[#e2e8f0] px-3"
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#0f172a]">
          Email
          <input
            type="email"
            {...register("email")}
            className="h-11 rounded-xl border border-[#e2e8f0] px-3"
          />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#0f172a]">
          Telefon
          <input
            type="tel"
            {...register("phone")}
            className="h-11 rounded-xl border border-[#e2e8f0] px-3"
          />
          {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#0f172a]">
          Adresă
          <textarea
            rows={3}
            {...register("address")}
            className="rounded-xl border border-[#e2e8f0] px-3 py-2"
          />
          {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#0f172a]">
          Fereastră de livrare
          <select
            {...register("deliveryWindow")}
            className="h-11 rounded-xl border border-[#e2e8f0] px-3"
          >
            <option value="Sâmbătă 10–13">Sâmbătă 10–13</option>
            <option value="Duminică 09–12">Duminică 09–12</option>
            <option value="Luni 18–20">Luni 18–20</option>
          </select>
        </label>
        <fieldset className="flex flex-col gap-3 text-sm text-[#0f172a]">
          <legend className="font-semibold">Metodă de plată (demo)</legend>
          <label className="flex items-center gap-2">
            <input type="radio" value="card" {...register("paymentMethod")} /> Card (mock)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="cash" {...register("paymentMethod")} /> Cash la livrare
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="transfer" {...register("paymentMethod")} /> Transfer bancar
          </label>
        </fieldset>
      </div>
      <Button type="submit" isLoading={isSubmitting}>
        Confirmă comanda demo
      </Button>
    </form>
  );
}

