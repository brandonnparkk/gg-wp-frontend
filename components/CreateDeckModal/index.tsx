import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  Autocomplete,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material';
import { fetchCardSuggestions, fetchCardDetails } from '@/hooks/useScryfall';

type CreateModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (deck: { name: string; format: string; commander: string }) => void;
};

export default function CreateDeckModal({ open, onClose, onCreate }: CreateModalProps) {
  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const [query, setQuery] = useState<string>("");
  const [deck, setDeck] = useState({
    name: '',
    format: '',
    commander: '',
    colors: [],
    visibility: '',
    lastUpdated: ''
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length === 0) {
        setSuggestions([]);
        return;
      }
  
      try {
        const results = await fetchCardSuggestions(query);
        setSuggestions(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error("Error fetching commander:", error);
        setSuggestions([]);
      }
    }, 500); // 500ms debounce
  
    return () => clearTimeout(delayDebounce); // Cleanup
  }, [query]);

  useEffect(() => {
    if (!deck.commander) return;
  
    const fetchCommanderDetails = async () => {
      try {
        const data = await fetchCardDetails(deck.commander);
        setDeck((prev) => ({
          ...prev,
          colors: data.colors || [],
        }));
      } catch (err) {
        console.error('Failed to fetch commander details:', err);
      }
    };
  
    fetchCommanderDetails();
  }, [deck.commander]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeck({ ...deck, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedDeck = {
      ...deck,
      lastUpdated: new Date().toISOString(), // set lastUpdated just before submission
    };

    onCreate(updatedDeck);
    onClose();
    setDeck({ name: '', format: '', commander: '', colors: [], visibility: '', lastUpdated: '' }); // reset form
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Create New Deck
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Deck Name"
              name="name"
              value={deck.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Format"
              name="format"
              value={deck.format}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="visibility-label">Visibility</InputLabel>
              <Select
                labelId="visibility-label"
                name="visibility"
                value={deck.visibility}
                label="Visibility"
                onChange={(e) =>
                  setDeck({ ...deck, visibility: e.target.value as string })
                }
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="unlisted">Unlisted</MenuItem>
              </Select>
            </FormControl>
            <Autocomplete
              disablePortal
              options={suggestions}
              onInputChange={(event, newInputValue) => {
                setQuery(newInputValue);
              }}
              onChange={(event, value) => {
                setDeck((prev) => ({ ...prev, commander: value }));
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Commander" />}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
