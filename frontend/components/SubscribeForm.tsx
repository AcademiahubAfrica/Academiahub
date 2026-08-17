"use client";

import { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

export default function SubscribeForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return toast.error("Enter your email address");
    if (!isValidEmail(trimmedEmail)) return toast.error("Enter a valid email address");

    startTransition(async () => {
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail }),
        });

        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(data?.message || "Unable to subscribe. Please try again.");
        }

        toast.success("Thanks — you're subscribed!");
        setEmail("");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Subscription failed",
        );
      }
    });
  };

  return (
    <form className={className} onSubmit={onSubmit}>
      <Input
        className="pl-4 rounded-2xl w-[70%]"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        aria-label="Email address"
      />
      <Button className="rounded-2xl" type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Subscribe"}
      </Button>
    </form>
  );
}
