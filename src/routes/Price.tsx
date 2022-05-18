import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {  fetchCoinPrice } from "../api";
import styled from "styled-components"
import Apexcharts from "react-apexcharts"
interface PriceProps {
    coinId:string;
}
interface ICoinPrice {
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
function Price({coinId} :PriceProps) {
    const {isLoading , data} = useQuery<ICoinPrice>(['prices',coinId] , ()=> fetchCoinPrice(coinId) , {
        refetchInterval:5000,
    });
    console.log(data);
    return (
        <div>
            {isLoading ? ("Loading Price...") :(
                <>
                    <Percent>
                        <h3>Current_Price</h3>
                        <h2>${data?.quotes.USD.price.toFixed(3)}</h2>
                    </Percent>
                    <Percent>
                        <h3>Percent for 15m</h3>
                        <h2>{data?.quotes.USD.percent_change_15m }%</h2>
                    </Percent>
                    <Percent>
                        <h3>Percent for 30m</h3>
                        <h2>{data?.quotes.USD.percent_change_30m}%</h2>
                    </Percent>
                    <Percent>
                        <h3>Percent for 1h</h3>
                        <h2>{data?.quotes.USD.percent_change_1h}%</h2>
                    </Percent>
                    <Percent>
                        <h3>Percent for 6h</h3>
                        <h2>{data?.quotes.USD.percent_change_6h}%</h2>
                    </Percent>
                    <Percent>
                        <h3>Percent for 12h</h3>
                        <h2>{data?.quotes.USD.percent_change_12h}%</h2>
                    </Percent>
                </>
                
        )}
        </div>
    )
}
const Percent = styled.div`
    display : flex;
    justify-content:space-between;
    align-items:center;
    border-radius:20px;
    background-color:#fff;
    padding:20px;
    margin-bottom:10px;
`
export default Price