import {GetDaysArrays} from '../../../../common/utils/getDays';

export let dataWeeksYearsMonth = (days: GetDaysArrays[]) => {
    let result: any = {
        month: [],
    }
    for (let i = 0; i < days.length; i++) {
        result.month.push({
            month: days[i][0].month,
            year: days[i][0].year,
            weeks: days[i][0].year % 4 === 0 ? 4 : 5       //Если год высокосный то получаем в месяце 4 недели
        })
    }
    return result
}