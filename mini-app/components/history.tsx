"use client";

import { useEffect, useState } from "react";
import { getHistory } from "@/lib/db";

export default function History() {
  const [history, setHistory] = useState<
    { winner: string; code: string; options: string[] }[]
  >([]);

  useEffect(() => {
    async function fetch() {
      const data = await getHistory();
      setHistory(data);
    }
    fetch();
  }, []);

  return (
    <section className="w-full max-w-md mt-8">
      <h3 className="text-lg font-semibold mb-2">Decision History</h3>
      {history.length === 0 ? (
        <p className="text-muted-foreground">No decisions yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, idx) => (
            <li key={idx} className="p-2 bg-muted rounded">
              <p>
                <strong>Winner:</strong> {item.winner}
              </p>
              <p>
                <strong>Code:</strong> {item.code}
              </p>
              <p>
                <strong>Options:</strong> {item.options.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
