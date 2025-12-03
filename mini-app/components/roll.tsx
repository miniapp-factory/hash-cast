"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { generateCode } from "@/lib/utils";
import { addDecision } from "@/lib/db";

export default function Roll() {
  const [options, setOptions] = useState<string[]>(["", "", "", "", "", ""]);
  const [winner, setWinner] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [rolling, setRolling] = useState(false);

  const handleRoll = async () => {
    const trimmed = options.map((o) => o.trim()).filter((o) => o);
    if (trimmed.length < 3 || trimmed.length > 6) {
      alert("Please enter between 3 and 6 options.");
      return;
    }
    setRolling(true);
    const newCode = generateCode();
    const idx = Math.floor(Math.random() * trimmed.length);
    const chosen = trimmed[idx];
    setWinner(chosen);
    setCode(newCode);
    await addDecision({ winner: chosen, code: newCode, options: trimmed });
    setRolling(false);
  };

  return (
    <section className="flex flex-col gap-4 w-full max-w-md">
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
            className={cn(
              "border rounded px-2 py-1",
              "focus:outline-none focus:ring-2 focus:ring-primary"
            )}
          />
        ))}
      </div>
      <button
        onClick={handleRoll}
        disabled={rolling}
        className={cn(
          "bg-primary text-primary-foreground rounded px-4 py-2",
          "hover:bg-primary/90 transition-colors"
        )}
      >
        {rolling ? "Rolling…" : "Roll"}
      </button>
      {winner && code && (
        <div className="mt-4 p-4 bg-background rounded shadow">
          <h2 className="text-xl font-semibold">Winner: {winner}</h2>
          <p className="text-sm text-muted-foreground">
            Proof of Fairness: {code}
          </p>
        </div>
      )}
    </section>
  );
}
