export function getDaysArray(year: number, month: number) {                   //функция которая высчитывает сколько дней в определённом месяце и возвращает нам массив сколько дней в месяце какой день год и месяц
    let numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray;
    const februaryDay = year % 4 === 0 ? 29 : 28
    numDaysInMonth = [31, februaryDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysIndex = {'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6};
    index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];
    daysArray = [];
    for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
        daysArray.push({
            year: year,
            month: month,
            number: (i + 1),
            day: daysInWeek[index!++]
        })
        if (index === 7) index = 0;
    }
    return daysArray;
}

export type GetDaysArrays = ReturnType<typeof getDaysArray>