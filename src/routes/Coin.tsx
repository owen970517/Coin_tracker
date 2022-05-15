import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Route, Routes, useLocation, useParams ,useMatch } from "react-router-dom"
import styled from "styled-components"
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import Chart from "./Chart";
import Price from "./Price";
interface ILocation {
    state:{
    name:string;
    rank:number;
    };
}
interface CoinProps {
    coinId :string;
}

interface infoData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
}
interface priceData {
    id :string;
    name :string;
    symbol :string;
    rank :number;
    circulating_supply :number;
    total_supply :number;
    max_supply :number;
    beta_value :number;
    first_data_at :string;
    last_updated :string;
    quotes :{
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap:  number;
            market_cap_change_24h:  number;
            percent_change_1h:  number;
            percent_change_1y: number;
            percent_change_6h:  number;
            percent_change_7d:  number;
            percent_change_12h:  number;
            percent_change_15m:  number;
            percent_change_24h:  number;
            percent_change_30d:  number;
            percent_change_30m:  number;
            percent_from_price_ath:  number;
            price:  number;
            volume_24h:  number;
            volume_24h_change_24h:  number;
        }
    };
}


function Coin() {
    const { coinId  }=useParams<{coinId:string}>();
/*     const [ loading ,setLoading] = useState(true); */
    const {state} = useLocation() as ILocation;
/*     const [info,setInfo] = useState<infoData>()
    const [price , setPrice] = useState<priceData>(); */
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
   /*  useEffect(()=> {
        (async ()=> {
            const InfoData =  await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const PriceData =  await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(InfoData);
            setPrice(PriceData);
            setLoading(false);
        })();
    },[coinId]) */
    const {isLoading : infoLoading , data : infoData} = useQuery<infoData>(["info",coinId] , ()=>fetchCoinInfo(coinId? coinId :""));
    const {isLoading: priceLoading , data:priceData} = useQuery<priceData>(["price",coinId] , ()=>fetchCoinPrice(coinId? coinId : ""));
    const loading = infoLoading || priceLoading
    return(
            <Container>
                <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </Title>
                </Header>
                { loading ? (<Loader> Loading...</Loader>) :
                (
                    <>
                    <Overview>
                      <OverviewItem>
                        <span>Rank:</span>
                        <span>{infoData?.rank}</span>
                      </OverviewItem>
                      <OverviewItem>
                        <span>Symbol:</span>
                        <span>${infoData?.symbol}</span>
                      </OverviewItem>
                      <OverviewItem>
                        <span>Open Source:</span>
                        <span>{infoData?.open_source ? "Yes" : "No"}</span>
                      </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                      <OverviewItem>
                        <span>Total Suply:</span>
                        <span>{priceData?.total_supply}</span>
                      </OverviewItem>
                      <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{priceData?.max_supply}</span>
                      </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !==null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive = {priceMatch !==null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    <Routes>
                        <Route path="price" element={<Price/>}></Route>
                        <Route path="chart" element={<Chart coinId={coinId!} />} ></Route>
                    </Routes>

                  </>
                ) }
            </Container>
    )
}
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
const Loader = styled.span`
    text-align:center;
    display:block;
    color:#fff;
`
const Title = styled.h1`
    font-size:48px;
    color : ${props => props.theme.accentColor}
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color : #FFF;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive : boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
export default Coin