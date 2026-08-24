"use client";

import { useState, useTransition, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type SubscribeFormProps = {
  className?: string;
};

/** Reusable newsletter form backed by POST /api/subscribe. */
export default function SubscribeForm({ className }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Enter your email address");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail }),
        });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.message ?? "Unable to subscribe. Please try again.");
        }

        toast.success("Thanks — you're subscribed!");
        setEmail("");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Subscription failed");
      }
    });
  };

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      <Input
        className="pl-4 rounded-2xl w-[70%]"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        required
        aria-label="Email address"
        autoComplete="email"
        disabled={isPending}
      />
      <Button className="rounded-2xl" type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Subscribe"}
      </Button>
    </form>
  );
}
