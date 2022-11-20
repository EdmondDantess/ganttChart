import axios from 'axios';

//// https://cors-anywhere.herokuapp.com/   its for avoid cors 50requests in hour
//https://api.allorigins.win/raw?url=

export const getData = async () => {
    const res = await axios.get<DataType>('https://api.allorigins.win/raw?url=http://82.202.204.94/tmp/test.php')
    return res.data
}


export type DataTypeChartSubSubSubSub = {
    id: number;
    title: string;
    period_start: string;
    period_end: string;
}
export type DataTypeChartSubSubSub = {
    id: number;
    title: string;
    period_start: string;
    period_end: string;
    sub: DataTypeChartSubSubSubSub[];
}
export type DataTypeChartSubSub = {
    id: number;
    title: string;
    period_start: string;
    period_end: string;
    sub: DataTypeChartSubSubSub[];
}

export type DataType = any & {
    project: string;
    period: string;
    chart: DataTypeChart;
}
export type DataTypeChartSub = {
    id: number;
    title: string;
    period_start: string;
    period_end: string;
    sub: DataTypeChartSubSub[];
}
export type DataTypeChart = {
    id: number;
    title: string;
    period_start: string;
    period_end: string;
    sub: DataTypeChartSub[];
}