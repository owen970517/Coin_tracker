import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import Apexcharts from "react-apexcharts"
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
    const params = useParams();
    const {isLoading , data} = useQuery<IHistorical[]>(['ohlcv',coinId] , ()=> fetchCoinHistory(coinId));
    return (
        <div>
            {isLoading ? ("Loading chart...") :(
            <Apexcharts 
                type="line" 
                series={
                [
                    {   
                        name:"price",
                        data: data?.map((price)=>price.close) as number[]
                    }

                ]}
                options={{
                    theme: {
                        mode : "dark"
                    },
                    chart : {
                        height:500, 
                        width:500,
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
                    yaxis:{
                        show:false,
                    },
                    xaxis:{
                        labels: {
                            show:false,
                        },
                        axisTicks : {
                            show:false,
                        },
                        axisBorder: {
                            show:false,
                        }
                    }
                }}>
            </Apexcharts>
        )}
        </div>
    )
}
export default Chart