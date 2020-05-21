import React, { useState, useEffect } from 'react'

function Quantity (props) {
  const [qtdproduct, setQtdProduct] = useState(1)

  const [totalproduct, setTotalProduct] = useState()

  const detail = Object.values(props)

  useEffect(() => {
    const qtdtotal = detail[2]
    setQtdProduct(qtdtotal)
  })

  useEffect(() => {
    const parcialcart = parseFloat(detail[0]) * detail[2]
    const decimal = parcialcart.toFixed(2)
    const strmoeda = '' + decimal
    const moeda = strmoeda.replace('.', ',')
    setTotalProduct(moeda)
  })

  function increment () {
    const qtdtotal = detail[2] + 1
    setQtdProduct(qtdtotal)
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
        return {
          id: item.id,
          name: item.name,
          picture: item.picture,
          price: item.price,
          qtd: item.qtd + 1
        }
      }
    })
    window.localStorage.setItem('cart', JSON.stringify(filteritem))
  }

  function decrement () {
    const qtdtotal = qtdproduct

    if (qtdtotal > 1) {
      const qtdtotal = detail[2] - 1
      setQtdProduct(qtdtotal)
    } else {
      const qtdtotal = qtdproduct
      setQtdProduct(qtdtotal)
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
          onClick={() => decrement()}
        >-</button>
        <input
          className="qtd-product-input"
          type="text"
          value={qtdproduct}
          onChange={e => (e.target.value)}
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
        <span className="product-cart-valor-qtd">{qtdproduct} un. R$ {
          totalproduct
        }
        </span>
      </div>
    </div>
  )
}

export default Quantity
