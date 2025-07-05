import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ShortenPage from './routes/ShortenPage';
import StatsPage from './routes/StatsPage';
import { useLogger } from './context/LoggerContext';

const App = () => {
  const location = useLocation();
  const { log } = useLogger();

  useEffect(() => {
    // Handle short URL redirection if path is a shortcode
    const path = location.pathname.slice(1); // Remove initial "/"
    
    // Skip redirection if on / or /stats
    if (!path || path === 'stats') return;

    const storedData = localStorage.getItem(path);
    if (storedData) {
      const urlObj = JSON.parse(storedData);
      const now = Date.now();

      // Check expiry
      if (urlObj.expiry && now > urlObj.expiry) {
        log("Expired Link Attempt", { shortcode: path });
        alert("This link has expired!");
        return;
      }

      // Push click log
      urlObj.clicks.push({
        timestamp: new Date().toISOString(),
        source: document.referrer || "direct",
        location: "India (mocked)",
      });

      // Save updated clicks
      localStorage.setItem(path, JSON.stringify(urlObj));
      log("Redirection Performed", { shortcode: path });

      // Redirect to original URL
      window.location.href = urlObj.longUrl;
    } else {
      log("Invalid Shortcode Access", { shortcode: path });
      alert("Invalid or unknown shortcode.");
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<ShortenPage />} />
      <Route path="/stats" element={<StatsPage />} />
      {/* Don't need :shortcode route handler here because redirection is handled in useEffect */}
    </Routes>
  );
};

export default App;
