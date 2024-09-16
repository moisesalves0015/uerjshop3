// components/FloatingMenu.js

"use client"; // Para indicar que o componente deve ser tratado como cliente no Next.js

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import '@styles/FloatingMenu.scss'; // Importa o arquivo de estilo
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import { CiHome } from "react-icons/ci";




const FloatingMenu = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="floating-menu">
      {/* Links de navegação */}
      {user? (
      <div>
      <Link className="menu-button" href="/">
      <CiHome />
      </Link>
      <Link className="menu-button" href="/create-work">
      <CiSaveUp2 />
      </Link>
       <Link className="menu-button" href="/wishlist">
       <CiHeart />
     </Link>
      <Link className="menu-button" href={`/shop?id=${user._id}`}>
        <CiUser />
      </Link>
      </div>
         )
        :
        (
          <div>
      <Link className="menu-button" href="/">
      <CiHome />
      </Link>
      <Link className="menu-button" href="/create-work">
      <CiSaveUp2 />
      </Link>
       <Link className="menu-button" href="/wishlist">
       <CiHeart />
     </Link>
      <Link className="menu-button" href={`/login`}>
        <CiUser />
      </Link>
      </div>
        )}
    </div>
  );
};

export default FloatingMenu;
