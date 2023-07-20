import {FormEvent, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  formatedPrice: string;
  formatedMarket: string;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home(){
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputSearch, setInputSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function getData(){
      await fetch('https://sujeitoprogramador.com/api-cripto/?key=d7c378a3be95d4b5')
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
        setCoins(formatResult);

      })
    }

    getData();
  }, [])

  function handleSearch(e: FormEvent){
    e.preventDefault();
    if(inputSearch === '') return;

    navigate(`/detail/${inputSearch}`);

  }

  return(
    <>
      <main className={styles.container}>

        <form className={styles.form} onSubmit={handleSearch}>
          <input 
            placeholder='Digite o símbolo da moeda: BTC...'
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)} 
          />
          <button type='submit'>
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
            {coins.map(coin => (
              <tr key={coin.name} className={styles.tr}>
                <td className={styles.tdLabel} data-label='Moeda'>
                  <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                    <span>{coin.name}</span> | {coin.symbol}
                  </Link>
                </td>
                <td className={styles.tdLabel} data-label='Mercado'>
                  {coin.formatedMarket}
                </td>
                <td className={styles.tdLabel} data-label='Preço'>
                  {coin.formatedPrice}
                </td>
                <td className={Number(coin?.delta_24h) >= 0 ? styles.tdProfit : styles.tdLoss} data-label='Volume'>
                  <span>{coin.delta_24h}</span>
                </td>
            </tr>
            ))}
          </tbody>
        </table>

      </main>
    </>
  )
}