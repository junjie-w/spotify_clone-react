import React from 'react';
import './Body.css';
import { Header } from './Header';

export const Body = ({ spotify }) => {
  return (
    <div className="body">
      <Header spotify={spotify} />
    </div>
  )
}
