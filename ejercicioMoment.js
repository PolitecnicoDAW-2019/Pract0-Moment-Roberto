const moment = require('moment');
const employees = [
    {
        name: 'Isildur',
        money: 1500,
        timezone: "Europe/Madrid",
        date: '15/01/2017 -- 10:30:30',
        updated_at: "",
    },
    {
        name: 'Frodo',
        money: 750,
        timezone: "Europe/Madrid",
        date: '16/01/2017 -- 10:35:30',
        updated_at: "",
    },
    {
        name: 'Bilbo',
        money: 1200,
        timezone: "Europe/Madrid",
        date: '18/01/2017 -- 18:35:27',
        updated_at: "",
    },
];

const DATE_FORMAT = 'DD/MM/YYYY';
const DATE_FORMAT_COMPLETE = 'DD/MM/YYYY HH:mm:ss';

const diffDates = (date1, date2) => date1.isSame(date2);

const interpretUnitTime = unitTime => [ unitTime.substr(0, unitTime.length - 1), unitTime.substr(unitTime.length - 1) ];

const sumDates = (date, unitTimes) => {
    const finalDate = unitTimes.reduce((newDate, unitTime) => {
        const [ number, type ] = interpretUnitTime(unitTime);
        return newDate.add(number, type);
    }, date.clone());

    return finalDate;
};

const setDateEmployee = _name => {
    const found = employees.find(({ name }) => name === _name);
    if (found) {
        found.date = moment(found.date, 'DD/MM/YYYY -- HH:mm:ss');
        found.updated_at = moment().format(DATE_FORMAT_COMPLETE);
    }
};

const secondsToString = seconds => {
    const numdays = Math.floor(seconds / 86400);
    const numhours = Math.floor((seconds % 86400) / 3600);
    const numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    const numseconds = ((seconds % 86400) % 3600) % 60;
    return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
}

const sumDiffDate = () => {
    const totalSecs = employees.reduce((accumulator, { date }) => {
        if (accumulator.date === date) {
            return accumulator;           
        }
        const date1 = moment(accumulator.date, DATE_FORMAT_COMPLETE);
        const date2 = moment(date, DATE_FORMAT_COMPLETE);
        const diff = Math.abs(date1.diff(date2, 's'));

        return { date, diff};
    }, { date: employees[0].date, diff: 0 });
    
    return secondsToString(totalSecs.diff);
};

const date1 = moment(employees[0].date, DATE_FORMAT_COMPLETE);
const date2 = moment(employees[1].date, DATE_FORMAT_COMPLETE);

console.log('diffDates:')
console.log(diffDates(date1, date2)) // false
console.log(diffDates(date1, date1)) // true

console.log('\nsumDates:')
console.log('Original date: ', date1.format(DATE_FORMAT_COMPLETE))
console.log('Final date: ', sumDates(date1, [ '24y', '14d' ]).format(DATE_FORMAT_COMPLETE))

console.log('\nsumDiffDate:');
console.log(sumDiffDate());

console.log('\nsetDateEmployee:');
setDateEmployee('Frodo')
console.log(employees)