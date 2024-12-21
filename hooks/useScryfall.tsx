async function fetchCardSuggestions(query: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const response = await fetch(`${apiUrl}/search-cards/?query=${query}`);
  const data = await response.json();
  return data.suggestions;
}

async function fetchCardDetails(cardName: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const response = await fetch(`${apiUrl}/get-card-details/?card_name=${encodeURIComponent(cardName)}`);
  const data = await response.json();
  return data;
}

export {fetchCardSuggestions, fetchCardDetails};