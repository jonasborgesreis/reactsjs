import React from 'react'
import axios from 'axios'
import '.././styles/cart.css'

export default function Cart () {
  function calcFrete () {
    // const [frete, setFrete] = useState(0)
    axios.get('https://zs5utiv3ul.execute-api.us-east-1.amazonaws.com/dev/freight/37480000')
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>teste</div>
  )
}
