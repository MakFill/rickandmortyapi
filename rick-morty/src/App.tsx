import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import './style.css';
import { Home, Char } from '@/pages';
import { IResultWithLike } from '@/interfaces';
import { List } from '@/components';
import { getCharacters } from '@/helpers';

function App() {
  const [characters, setCharacters] = useState<IResultWithLike[]>(() => {
    const saved = localStorage.getItem('chars');
    const initialValue = (saved && JSON.parse(saved)) || null;
    return initialValue || [];
  });

  useEffect(() => {
    if (!characters.length) {
      setChars();
    } else {
      localStorage.setItem('chars', JSON.stringify(characters));
    }

    async function setChars() {
      const items = await getCharacters();
      setCharacters(items);
      localStorage.setItem('chars', JSON.stringify(items));
    }
  }, [characters]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home characters={characters} />} />
        <Route
          path="/liked"
          element={<List characters={characters.filter((item) => item.liked === true)} />}
        />
        <Route path="/list" element={<List characters={characters} />} />
        <Route
          path="/chars/:id"
          element={<Char characters={characters} setCharacters={setCharacters} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
