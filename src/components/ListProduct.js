import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import '.././styles/product.css'

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function ListProduct () {
  const [products, setProducts] = useState([])

  const [cart, setCart] = useState([])

  const [open, setOpen] = useState(false)

  const [severity, setSeverity] = useState('')

  useEffect(() => {
    axios.get('https://zs5utiv3ul.execute-api.us-east-1.amazonaws.com/dev/products')
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const data = window.localStorage.getItem('cart')
    if (data) {
      setCart(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  function addCart (product) {
    const data = JSON.parse(window.localStorage.getItem('cart'))

    const duplicate = data.some(item => item.id === product.id)

    if (duplicate) {
      setSeverity('warning')
      handleClick()
    } else {
      setSeverity('success')
      const preconumber = `${product.price.to.integers.replace('.', '')}.${product.price.to.decimals}`
      const precomoeda = preconumber
      const newproduct = {
        id: product.id,
        name: product.name,
        picture: product.picture,
        price: precomoeda,
        qtd: 1
      }
      data.unshift(newproduct)
      setCart(data)
      window.localStorage.setItem('cart', JSON.stringify(cart))
      handleClick()
    }
  }

  return (
    <div className="container-list-product">
      { severity === 'success' &&
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Produto adicionado ao carrinho com sucesso!
        </Alert>
      </Snackbar>
      }
      { severity === 'warning' &&
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Produto foi adicionado anteriormente!
        </Alert>
      </Snackbar>
      }
      <ul>
        {products.map(product => {
          const preconumber = `${product.price.to.integers.replace('.', '')}.${product.price.to.decimals}`
          const precomoeda = preconumber.replace('.', ',')

          return (
            <li key={product.id}>
              {product.tag !== null &&
                <span className="tag-exclusive">
                  {product.tag.label}
                </span>
              }
              <img className="product-image" src={product.picture} />
              {product.offer !== null &&
                <span className="product-offer">
                  <span className="offer-label">{product.offer.label}</span>
                  <span className="offer-value">-{product.offer.value}%</span>
                </span>
              }
              <span className="product-name">
                {product.name}
              </span>
              <span className="product-add-cart">
                <button
                  className="btn-add-cart"
                  type='button'
                  onClick={() =>
                    addCart(product)}>
                Adicionar ao carrinho
                </button>
              </span>
              {product.price.from !== null
                ? <span className="product-description-desc">
                  <span className="product-price">
                    R${precomoeda} {product.unit}
                  </span>
                  {product.price.from !== null &&
                    <span className="product-price-descont">
                      {parseInt(product.price.from.integers.replace('.', ''))
                        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  }
                  {product.installments !== null &&
                    <span className="product-installments">
                      <strong>{product.installments.amount}x</strong> de <strong>R${product.installments.value}</strong> s/ juros
                    </span>
                  }
                </span>
                : <span className="product-description">
                  <span className="product-price">
                    R${precomoeda} {product.unit}
                  </span>
                  {product.price.from !== null &&
                    <span className="product-price-descont">
                      {parseInt(product.price.from.integers.replace('.', ''))
                        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  }
                  {product.installments !== null &&
                    <span className="product-installments">
                      <strong>{product.installments.amount}x</strong> de <strong>R${product.installments.value}</strong> s/ juros
                    </span>
                  }
                </span>
              }
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}
