import React from 'react'
import ItensCart from './ItensCart'
import '.././styles/header.css'
// import logo from '../images/logo.svg'

export default function Header () {
  return (
    <header>
      <div className="container-header">
        <h1 className="logo-web">
          Os melhores produtos
        </h1>
        <ItensCart />
      </div>
    </header>
  )
}
