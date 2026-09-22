export type AllocationSlice = {
  label: string;
  percent: number;
};

export function deriveAllocationBreakdown(portfolioId: string): AllocationSlice[] {
  let hash = 0;
  for (let i = 0; i < portfolioId.length; i += 1) {
    hash = (hash + portfolioId.charCodeAt(i) * (i + 1)) % 100;
  }

  const availableCash = 10 + (hash % 21);
  const cashReserve = 10 + ((hash * 7) % 26);
  const invested = 100 - availableCash - cashReserve;

  return [
    { label: "Available cash", percent: availableCash },
    { label: "Cash reserve", percent: cashReserve },
    { label: "Invested", percent: invested },
  ];
}
