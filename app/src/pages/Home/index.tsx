import * as React from 'react';
import { Menu } from '../../components/Menu';
import { useAuth } from '../../hooks/Authenticate';

export const Home = () => {
  const { user } = useAuth();

  return (
    <Menu>
      <h2>Bem vindo(a), {user.name.toUpperCase()}</h2>      
    </Menu>
  );
}