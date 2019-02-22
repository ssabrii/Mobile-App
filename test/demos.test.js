import moment from 'moment';



test('(1) moment - timestamp tests', () => {
	let t = 1551225600000;
	let time = moment(t);
  console.log(`(1:1) ${time}`);
  
  time = new Date(t)
  console.log(`(1:2) ${time}`)
  
//   console.log(moment.unix(1454521239279/1000).format("DD MMM YYYY hh:mm a"))
});

test('(2) moment - formats test', () => {
  var now = moment();//.format('MMM DD h:mm A');
  var str = '';

  str += `year: ${now.year()}\n`;
  str += `month: ${now.month()}\n`;
  str += `month name: ${now.format('MMMM')}\n`;
  str += `day: ${now.date()}\n`;

  console.log(`(2) Moment: ${now.unix()}\n${str}`)
});


test('(3) search in array', () => {
  const arr = [123, 'blank road', 'the map ahead', 'where are these things going to...', 9.38];
  const arrStr = arr.join(' ');
  const res = [
    arrStr.indexOf("45") > -1, 
    arrStr.indexOf("3") > -1, 
    arrStr.indexOf("blank") > -1, 
    arrStr.indexOf("ala bala") > -1, 
  ];


  console.log(`(3) ${res}`)
});