import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "../api";

interface ICoin {
    id:string,
    name:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string,
    symbol:string
}

function Coins() {
/*  const [coins,setCoins] = useState<ICoin[]>([]);
    const [loading , setLoading] = useState(true);
    useEffect(()=>{
        (async() => {
            const response =await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,10));
            setLoading(false);
        })();
    },[]); */
    const {isLoading , data} = useQuery<ICoin[]>("allCoins",fetchCoins)
    return(
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            { isLoading ? (<Loader> Loading...</Loader>) : (<CoinList>
                {data?.slice(0,10).map((coin)=>  
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`} state={{name:coin.name , rank : coin.rank}}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="asd"/>
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                )}
            </CoinList>
            )}
        </Container>
    )
}
const Title = styled.h1`
    font-size:48px;
    color : ${props => props.theme.accentColor}
`
const Container = styled.div`
    padding:0px 20px;
    max-width:480px;
    margin:0px auto;
`
const Header= styled.header`
    height:10vh;
    display:flex;
    justify-content:center;
    align-items:center;
`
const CoinList = styled.ul`

`
const Coin = styled.li`
    background-color:#fff;
    color : ${props => props.theme.bgColor};
    border-radius:30px;
    margin-bottom:10px;
    a {
        display:flex;
        align-items:center;
        transition : color 0.2s ease-in;
        padding:20px;
    }
    &:hover {
        a{
            color:${props=>props.theme.accentColor}
        }
    }
`
const Loader = styled.span`
    text-align:center;
    display:block;
    color:#fff;
`
const Img = styled.img`
    width:35px;;
    height:35px;;
    margin-right:10px;
`

export default Coins