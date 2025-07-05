// src/routes/StatsPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';

const StatsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const urls = keys.map(key => JSON.parse(localStorage.getItem(key))).filter(item => item.longUrl);
    setData(urls);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Statistics</Typography>
      {data.map((item, idx) => (
        <div key={idx}>
          <Typography><strong>Short:</strong> {item.shortcode}</Typography>
          <Typography><strong>Clicks:</strong> {item.clicks.length}</Typography>
          {item.clicks.map((click, i) => (
            <div key={i}>
              <Typography>🔹 {click.timestamp} - {click.source} - {click.location}</Typography>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </Container>
  );
};

export default StatsPage;

