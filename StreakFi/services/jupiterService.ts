const JUPITER_QUOTE =
  "https://quote-api.jup.ag/v6/quote";

export const getSwapQuote = async (
  inputMint: string,
  outputMint: string,
  amount: number
) => {

  const url =
    `${JUPITER_QUOTE}?` +
    `inputMint=${inputMint}&` +
    `outputMint=${outputMint}&` +
    `amount=${amount}&` +
    `slippageBps=50`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export const executeSwap = async (route: any) => {

  const res = await fetch(
    "https://quote-api.jup.ag/v6/swap",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route,
      }),
    }
  );

  const data = await res.json();

  return data;
};