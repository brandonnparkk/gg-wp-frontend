import { getApiUrl } from '../utils/apiConfig';

const apiUrl = getApiUrl();

// if cards in the DB
// async function fetchCardSuggestions(query: string) {
//   const response = await fetch(`${apiUrl}/search-cards/?query=${query}`);
//   const data = await response.json();
//   return data.suggestions;
// }

// async function fetchCardDetails(cardName: string) {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
//   const response = await fetch(`${apiUrl}/get-card-details/?card_name=${encodeURIComponent(cardName)}`);
//   const data = await response.json();
//   return data;
// }

async function fetchCardSuggestions(query: string) {
  const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.data; // This is an array of card name suggestions
}

async function fetchCardDetails(cardName: string) {
  const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
  if (!response.ok) {
    throw new Error(`Card not found: ${cardName}`);
  }
  const data = await response.json();
  return data;
}

export {fetchCardSuggestions, fetchCardDetails};