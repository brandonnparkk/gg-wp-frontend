import { Card, CardMedia, Box } from '@mui/material';
import { useState } from 'react';
import './CardFlip.css'; // for custom flip/foil styles

type MTGCardProps = {
  name: string;
  frontImage?: string;
  backImage?: string;
  isFoil?: boolean;
};

export default function MTGCard({ name, frontImage, backImage, isFoil }: MTGCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box className="card-wrapper" onClick={() => backImage && setFlipped(!flipped)}>
      <Box className={`card-inner ${flipped ? 'flipped' : ''}`}>
        {frontImage && (
          <Card className={`card-face front ${isFoil ? 'foil' : ''}`}>
            <CardMedia component="img" height="350" image={frontImage} alt={name} />
          </Card>
        )}
        {backImage && (
          <Card className={`card-face back ${isFoil ? 'foil' : ''}`}>
            <CardMedia component="img" height="350" image={backImage} alt={`${name} - Back`} />
          </Card>
        )}
      </Box>
    </Box>
  );
}
