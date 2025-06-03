"use client"
import React, { useState } from 'react'
import { useVectorSearch } from '@/hooks/useVectorSearch';
import MTGCard from '@/components/MTGCard';
import { Grid, TextField, Button } from '@mui/material';

interface CardModel {
  name: string,
  mana_cost: string,
  toughness: string,
  mana_value: string,
  text: string,
  power: string,
  rarity: string,
  type: string,
  colors: string,
  front_image_url?: string,
  back_image_url?: string
}

const colorToIdentityMap = {
  B: "Black",
  R: "Red",
  W: "White",
  G: "Green",
  U: "Blue",
}

const CardSearch = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { results, error, loading } = useVectorSearch(searchQuery); // Hook at top level

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  }

  const handleSearch = (): void => {
    setSearchQuery(query.trim().toLowerCase());
  }

  const replaceManaCost = (manaCost: string) => {
    if (!manaCost) return manaCost;

    return manaCost.split('').map((char) => {
      return colorToIdentityMap[char] || char; // Replace symbol with color name or keep the original symbol
    }).join('');
  };

  return (
    <div>
      <h1>CardSearch</h1>
      <div className='text-field-container' style={{ display: 'flex', justifyContent: 'center'}}>
        <div className='' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            variant="standard"
            value={query}
            onChange={handleInputChange}
          />
          <Button onClick={handleSearch} variant="contained">Search</Button>
        </div>
      </div>
      {/* <input
        placeholder='MTG card to search'
        value={query}
        onChange={handleInputChange}
      /> */}
      {/* <button onClick={handleSearch}>Search</button> */}

      {loading && <p>Searching...</p>}
      {error && <p>Error: {error}</p>}
      {/* {results?.metadatas[0]?.length > 0 && (
        <ul>
          {results.metadatas[0].map((doc: string, i: number) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
      )} */}
      {results?.metadatas?.[0]?.length > 0 && (
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {results.metadatas[0].map((doc: CardModel, i: number) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <MTGCard
                  name={doc?.name}
                  frontImage={doc?.front_image_url}
                  backImage={doc?.back_image_url}
                />
              </Grid>
            ))}
          </Grid>
      )}
    </div>
  )
}

export default CardSearch;