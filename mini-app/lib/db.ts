export async function addDecision(record: {
  winner: string;
  code: string;
  options: string[];
}) {
  // Placeholder: in a real app this would persist to a public database.
  // For now, store in localStorage for demo purposes.
  const existing = JSON.parse(
    localStorage.getItem("hashcast_history") ?? "[]"
  );
  existing.push(record);
  localStorage.setItem("hashcast_history", JSON.stringify(existing));
}

export async function getHistory() {
  const existing = JSON.parse(
    localStorage.getItem("hashcast_history") ?? "[]"
  );
  return existing;
}
