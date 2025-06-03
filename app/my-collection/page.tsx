'use client'

import React, { useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import CreateDeckModal from '@/components/CreateDeckModal';

type Deck = {
  name: string,
  colors: string[],
  visibility: string,
  lastUpdated: string
};

const MyCollection = () => {
  const mockedDecks = [
    {
      name: 'deck 1',
      colors: ['white', 'blue'],
      visibility: 'Private',
      lastUpdated: 'Now'
    },
    {
      name: 'deck 2',
      colors: ['red', 'blue', 'white'],
      visibility: 'Public',
      lastUpdated: 'Yesterday'
    },
    {
      name: 'deck 3',
      colors: ['red', 'blue', 'white'],
      visibility: 'Public',
      lastUpdated: 'Yesterday'
    }
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [decks, setDecks] = useState(mockedDecks);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  const handleCreateDeck = (newDeck: Deck) => {
    setDecks((prev) => [...prev, newDeck]);
  };

  return (
    <div>
      <h1>My Decks</h1>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={toggleModal}>
        Add a New Deck
      </Button>

      { modalOpen && <CreateDeckModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreateDeck} /> }

      <Grid container spacing={2} direction="column">
        {decks.map((deck, index) => (
          <Grid container spacing={2} key={index}>
            <Grid>
              <Typography>{deck.name}</Typography>
            </Grid>
            <Grid>
              <Typography>{deck.colors}</Typography>
            </Grid>
            <Grid>
              <Typography>{deck.visibility}</Typography>
            </Grid>
            <Grid>
              <Typography>{deck.lastUpdated}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default MyCollection