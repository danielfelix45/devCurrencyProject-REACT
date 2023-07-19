import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

import {BiSearch} from 'react-icons/bi';

//https://sujeitoprogramador.com/api-cripto/?key=d7c378a3be95d4b5

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home(){
  const [coins, setCoins] = useState<CoinProps[]>([]);

  useEffect(() => {
    function getData(){
      fetch('https://sujeitoprogramador.com/api-cripto/?key=d7c378a3be95d4b5')
      .then(response => response.json())
      .then((data: DataProps) => {
        // Aqui restringe a busca de apenas 15 itens.
        let coinsData = data.coins.slice(0, 15)

        let price = Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const formatResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.price)),
            formatedMarket: price.format(Number(item.market_cap))
          }

          return formated;
        })
        console.log(formatResult)
        setCoins(formatResult);

      })
    }

    getData();
  }, [])

  return(
    <>
      <main className={styles.container}>

        <form className={styles.form}>
          <input placeholder='Digite o símbolo da moeda: BTC...' />

          <button className={styles.button}>
            <BiSearch size={30} color="#fff"/>
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th scope='col'>Moeda</th>
              <th scope='col'>Valor mercado</th>
              <th scope='col'>Preço</th>
              <th scope='col'>Volume</th>
            </tr>
          </thead>
          <tbody id='tbody'>
            <tr className={styles.tr}>
              <td className={styles.tdLabel} data-label='Moeda'>
                <Link className={styles.link} to={'/detail/btc'}>
                  <span>Bitcoin</span> | BTC
                </Link>
              </td>
              <td className={styles.tdLabel} data-label='Mercado'>
                R$ 193565
              </td>
              <td className={styles.tdLabel} data-label='Preço'>
                R$ 40.956
              </td>
              <td className={styles.tdProfit} data-label='Volume'>
                <span>-5.3</span>
              </td>
            </tr>
          </tbody>
        </table>

      </main>
    </>
  )
}