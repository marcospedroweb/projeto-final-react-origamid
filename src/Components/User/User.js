import React from 'react';
import UserHeader from './UserHeader';
import { Routes, Route } from 'react-router-dom';
import Feed from '../Feed/Feed';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

const User = () => {
  return (
    <section className="container">
      {/* Header personalizado */}
      <UserHeader />
      <Routes>
        {/* Perfil Padrão */}
        <Route path="/" element={<Feed />} />
        {/* Para a postagem de fotos */}
        <Route path="postar" element={<UserPhotoPost />} />
        {/* Mostra a info sobre as fotos */}
        <Route path="estatisticas" element={<UserStats />} />
      </Routes>
    </section>
  );
};

export default User;
