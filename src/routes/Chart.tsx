import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import Apexcharts from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
interface ChartProps {
    coinId:string;
}
interface IHistorical {
    time_open: string
    time_close: string
    open: number
    high:number
    low: number
    close: number
    volume:number
    market_cap: number
}

function Chart({coinId} :ChartProps) {
    const isDark = useRecoilValue(isDarkAtom)
    const {isLoading , data} = useQuery<IHistorical[]>(['ohlcv',coinId] , ()=> fetchCoinHistory(coinId));
    return (
        <div>
            {isLoading ? ("Loading chart...") :(
            <Apexcharts 
                type="candlestick" 
                series={[
                    {
                        data: data?.map((price) => {
                            return{
                            x: price.time_close,
                            y: [price.open.toFixed(3), price.high.toFixed(3), price.low.toFixed(3), price.close.toFixed(3)]
                            }
                        })
                    },
                    ] as any }
                options={{
                    theme: {
                        mode : isDark ? "dark":"light" 
                    },
                    chart : {
                        type:"candlestick",
                        height:500, 
                        width:700,
                        toolbar: {
                            show:false,
                        },
                        background :"transparent",
                    },
                    stroke: {
                        curve:"smooth",
                        width:5,
                    },
                    grid: {
                        show:false,
                    },
                    yaxis : {
                        show : false,
                    },
                    xaxis:{
                       type:"datetime",
                        categories : data?.map((price)=>price.time_close)
                    },
                    fill : {
                        type :"gradient",
                        gradient : {gradientToColors : ["blue"] , stops :[0,100]}
                    },
                    colors : ["red"],
                    tooltip : {
                        y: {
                            formatter : (value) => `$${value.toFixed(2)}`
                        } 
                    }
                }}>
            </Apexcharts>
        )}
        </div>
    )
}
export default Chart