"use client";

import { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

// Small, focused subscribe form used in footer and landing.
export default function SubscribeForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  // Very small email validation
  const valid = (v: string) => /^\S+@\S+\.\S+$/.test(v);

  // Submit email to backend endpoint (frontend-only wiring)
  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email.trim()) return toast.error("Enter your email");
    if (!valid(email)) return toast.error("Enter a valid email");

    startTransition(async () => {
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error((await res.json()).message || "Failed");
        toast.success("Thanks — you're subscribed!");
        setEmail("");
      } catch (err: any) {
        toast.error(err?.message || "Subscription failed");
      }
    });
  };

  return (
    <form className={className} onSubmit={onSubmit}>
      <Input
        className="pl-4 rounded-2xl w-[70%]"
        placeholder="you@school.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        aria-label="Email address"
      />
      <Button className="rounded-2xl" type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Subscribe"}
      </Button>
    </form>
  );
}
