import React from 'react';
import load from '../assets/Spinner-5.gif';
import '../styles/Loading.css';

export default function 
() {
  return (
    <div className='loading-main'>
        <img src={load} alt="loading" />
    </div>
  )
}
