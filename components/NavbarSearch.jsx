"use client";

import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { CiSearch } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import "@styles/NavbarSearch.scss";

const NavbarSearch = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const searchWork = async () => {
    if (query.trim()) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <div className='navbar_search_mobile'>
      <input
        type='text'
        placeholder='Procurar...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton disabled={query === ''} onClick={searchWork}>
        <CiSearch />
      </IconButton>
    </div>
  );
};

export default NavbarSearch;
