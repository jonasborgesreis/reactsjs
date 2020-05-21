import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Quantity from './Quantity'
import commerce from '../images/commerce.svg'
import cancel from '../images/cancel.svg'
import removeitem from '../images/remove.svg'
import '.././styles/cart.css'

export default function ItensCart () {
  const [cartvisible, setCartVisible] = useState(false)

  const [itencart, setItensCart] = useState([])

  const [qtdcart, setQtdCart] = useState(0)

  const [cep, setCep] = useState('')

  const [pricefrete, setPriceFrete] = useState(0)

  // const [qtdproduct, setQtdProduct] = useState(1)

  const [subtotal, setSubTotal] = useState(0)

  const [total, setTotal] = useState(0)

  function cepPrice () {
    axios.get(`https://zs5utiv3ul.execute-api.us-east-1.amazonaws.com/dev/freight/${cep}`)
      .then(res => {
        console.log('teste resposta frete', res.data.freight)
        setPriceFrete(res.data.freight)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    let ignore = false
    async function fetchProduct () {
      const data = await JSON.parse(window.localStorage.getItem('cart'))
      if (!ignore) {
        setItensCart(data)
      }
    }
    fetchProduct()
    return () => { ignore = true }
  }, [itencart])

  useEffect(() => {
    const qtdprice = itencart.map(item => parseFloat(item.price) * item.qtd)
    const formatvalue = qtdprice.reduce((a, b) => a + b, 0)
    const subtotalparcial = formatvalue.toFixed(2)
    const strmoeda = '' + subtotalparcial
    const moeda = strmoeda.replace('.', ',')
    setSubTotal(moeda)
  })

  useEffect(() => {
    const priceformatado = parseFloat(pricefrete)
    const subparcial = subtotal + ''
    const totalfrete = parseFloat(subparcial.replace(',', '.')) + priceformatado
    const totalparcial = totalfrete.toFixed(2)
    const strmoeda = '' + totalparcial
    const moeda = strmoeda.replace('.', ',')
    setTotal(moeda)
  })

  useEffect(() => {
    const qtdparcial = itencart.length
    setQtdCart(qtdparcial)
  })

  useEffect(() => {
    if (itencart.length === 0) {
      setSubTotal(0)
    }
  })

  function removeProduct (id) {
    const remover = itencart.filter(item => item.id !== id)
    window.localStorage.setItem('cart', JSON.stringify(remover))
  }

  return (
    <div>
      <div className="box-itens-cart">
        <span className="icon-cart" onClick={() => setCartVisible(true)}>
          <img src={ commerce } />
        </span>
        <div className="counter-cart">
          <span>{ qtdcart }</span>
        </div>
      </div>
      { cartvisible &&
        <div>
          <div className="container-transparent">
          </div>
          <div className="container-cart">
            <div className="btn-close-cart">
              <button onClick={() => setCartVisible(false)}>
                <img src={cancel} />
              </button>
            </div>
            <h2 className="title">Produtos no carrinho</h2>
            <div className="frete">
              <input
                type='text'
                placeholder="Calcular cep"
                className="frete-input"
                id="cep"
                maxLength="8"
                value={ cep }
                onChange={e => setCep(e.target.value)}
              />
              <button
                className="frete-ok"
                onClick={(e) => cepPrice(cep)}
              >
                Calcular
              </button>
            </div>
            <div className="list-cart-products">
              <ul>
                {
                  itencart.map(product => (
                    <li key={ product.id } className="cart-product-list-item">
                      <span className="product-img">
                        <img src={ product.picture } />
                      </span>
                      <span className="product-details">
                        <span className="cart-product-name">
                          { product.name }
                        </span>
                        <div className="box-qtd-price">
                          <Quantity
                            price={product.price}
                            id={product.id}
                            qtd={product.qtd}
                          />
                          <span className="btn-delete">
                            <button
                              type='button'
                              onClick={() => removeProduct(product.id)}
                            >
                              <img src={removeitem} />
                            </button>
                          </span>
                        </div>
                      </span>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="cart-price">
              <span>
                Frete: R$ { pricefrete }
              </span>
              <span>
                Subtotal: { parseFloat(subtotal.toString().replace(',', '.'))
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <span>
                Total: { parseFloat(total.replace(',', '.'))
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <button className="btn-add-cart">IR PARA O CARRINHO</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
