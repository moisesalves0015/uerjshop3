"use client";

import "@styles/Navbar.scss";
import { ShoppingCart } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { CiMenuBurger, CiUser, CiSearch } from "react-icons/ci";
import NavbarSearch from '@components/NavbarSearch'; // Certifique-se de que o caminho está correto

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [dropdownMenu, setDropdownMenu] = useState(false);

  const handleLogout = async () => {
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const searchWork = async () => {
    if (query.trim()) {
      router.push(`/search/${query}`);
    }
  };

  const cart = user?.cart;

  return (
    <div className='navbar_container'>
      <div className='navbar'>
        <a href="/">
          <img src='/assets/logo.png' alt='logo' />
        </a>

        <div className='navbar_search'>
          <input
            type='text'
            placeholder='Procurar...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <IconButton disabled={!query.trim()} onClick={searchWork}>
            <CiSearch />
          </IconButton>
        </div>

        <div className='navbar_right'>
          {user && (
            <a href="/cart" className="cart">
              <ShoppingCart sx={{ color: "gray" }} />
              Cart <span>({cart?.length})</span>
            </a>
          )}
          <button
            className='navbar_right_account'
            onClick={() => setDropdownMenu(!dropdownMenu)}
          >
            <CiMenuBurger />
            {!user ? (
              <CiUser />
            ) : (
              <img
                src={user.profileImagePath}
                alt='profile'
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            )}
          </button>

          {dropdownMenu && !user && (
            <div className='navbar_right_accountmenu'>
              <Link href="/login">Logar</Link>
              <Link href="/register">Cadastrar</Link>
            </div>
          )}

          {dropdownMenu && user && (
            <div className='navbar_right_accountmenu'>
              <Link href="/wishlist">Favoritos</Link>
              <Link href={`/shop?id=${user._id}`}>Meus Anuncios</Link>
              <Link href="/create-work">Anunciar</Link>
              <a onClick={handleLogout}>Sair</a>
            </div>
          )}
        </div>
      </div>



      <div>
        { user?  (
          <div className="navbar_mobile">
            <h4 className="navbar_mobile_ola">Olá {user.username} </h4>
            <h1 className="navbar_mobile_welcome">Bem-vindo ao Marketplace da UERJ</h1>
            <NavbarSearch />
          </div>
        ) : (
          <div className="navbar_mobile">
            <h4 className="navbar_mobile_ola">Olá </h4>
            <h1 className="navbar_mobile_welcome">Bem-vindo ao Marketplace da UERJ</h1>
            <NavbarSearch />
          </div>
        )}
      </div>


    </div >
  );
};

export default Navbar;
