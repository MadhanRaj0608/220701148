// src/routes/ShortenPage.jsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useLogger } from '../context/LoggerContext';

const ShortenPage = () => {
  const { log } = useLogger();
  const [urls, setUrls] = useState([{ longUrl: '', validity: 30, shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleShorten = () => {
    const newResults = urls.map((entry) => {
      const id = entry.shortcode || uuidv4().slice(0, 6);
      const expiry = Date.now() + entry.validity * 60000;
      const shortObj = {
        ...entry,
        shortcode: id,
        expiry,
        createdAt: Date.now(),
        clicks: [],
      };

      localStorage.setItem(id, JSON.stringify(shortObj));
      log("URL Shortened", shortObj);
      return shortObj;
    });
    setResults(newResults);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>React URL Shortener</Typography>
      <Grid container spacing={2}>
        {urls.map((entry, idx) => (
          <Grid item xs={12} key={idx}>
            <TextField fullWidth label="Long URL"
              value={entry.longUrl}
              onChange={(e) => handleChange(idx, 'longUrl', e.target.value)} />
            <TextField label="Validity (mins)"
              type="number"
              value={entry.validity}
              onChange={(e) => handleChange(idx, 'validity', e.target.value)} />
            <TextField label="Custom Shortcode"
              value={entry.shortcode}
              onChange={(e) => handleChange(idx, 'shortcode', e.target.value)} />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={handleShorten} sx={{ mt: 2 }}>Shorten</Button>

      <Typography variant="h6" mt={4}>Shortened URLs</Typography>
      {results.map((res, idx) => (
        <div key={idx}>
          <a href={`/${res.shortcode}`}>{window.location.origin}/{res.shortcode}</a> (expires at {new Date(res.expiry).toLocaleString()})
        </div>
      ))}
    </Container>
  );
};

export default ShortenPage;
