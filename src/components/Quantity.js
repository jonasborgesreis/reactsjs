import React, { useState, useEffect } from 'react'

function Quantity (props) {
  const [qtdProduct, setQtdProduct] = useState(1)

  const [totalProduct, setTotalProduct] = useState()

  const detail = Object.values(props)

  useEffect(() => {
    const qtdTotal = detail[2]
    setQtdProduct(qtdTotal)
  })

  useEffect(() => {
    const parcialCart = parseFloat(detail[0]) * detail[2]
    const decimal = parcialCart.toFixed(2)
    const strMoeda = '' + decimal
    const moeda = strMoeda.replace('.', ',')
    setTotalProduct(moeda)
  })

  function increment () {
    const qtdTotal = detail[2] + 1
    setQtdProduct(qtdTotal)
    const data = JSON.parse(window.localStorage.getItem('cart'))

    const filterItem = data.map(item => {
      if (item.id !== detail[1]) {
        return {
          id: item.id,
          name: item.name,
          picture: item.picture,
          price: item.price,
          qtd: item.qtd
        }
      } else {
        return {
          id: item.id,
          name: item.name,
          picture: item.picture,
          price: item.price,
          qtd: item.qtd + 1
        }
      }
    })
    window.localStorage.setItem('cart', JSON.stringify(filterItem))
  }

  function decrement () {
    const qtdTotal = qtdProduct

    if (qtdTotal > 1) {
      const qtdTotal = detail[2] - 1
      setQtdProduct(qtdTotal)
    } else {
      const qtdTotal = qtdProduct
      setQtdProduct(qtdTotal)
    }

    const data = JSON.parse(window.localStorage.getItem('cart'))

    const filteritem = data.map(item => {
      if (item.id !== detail[1]) {
        return {
          id: item.id,
          name: item.name,
          picture: item.picture,
          price: item.price,
          qtd: item.qtd
        }
      } else {
        if (item.qtd === 1) {
          return {
            id: item.id,
            name: item.name,
            picture: item.picture,
            price: item.price,
            qtd: item.qtd
          }
        } else {
          return {
            id: item.id,
            name: item.name,
            picture: item.picture,
            price: item.price,
            qtd: item.qtd - 1
          }
        }
      }
    })
    window.localStorage.setItem('cart', JSON.stringify(filteritem))
  }

  return (
    <div className="cart-product-qtd">
      <div className="product-cart-box-qtd">
        <button
          type="button"
          className="btn-qtd"
          onClick={ () => decrement() }
        >-</button>
        <input
          className="qtd-product-input"
          type="text"
          value={ qtdProduct }
          onChange={ e => (e.target.value) }
        />
        <button
          type="button"
          className="btn-qtd"
          onClick={() => increment()}
        >+</button>
      </div>
      <div className="product-cart-box-valor">
        <span className="product-cart-valor">1 un. R$ {
          parseFloat(detail[0]).toFixed(2)
        }
        </span>
        <span className="product-cart-valor-qtd">{ qtdProduct } un. R$ { totalProduct }
        </span>
      </div>
    </div>
  )
}

export default Quantity
