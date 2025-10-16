/**
 *
 * @param {string} date
 * @param {string} format
 *
 * Arjunane Format Date
 * - days           : ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
 * - shortDays      : ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
 * - months         : ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
 * - shortMonths    : ['Jan',  'Feb', "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
 */
const FormatDate = (date: any, format?: string | 'l, d F Y'): string => {
  let days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  let shortDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  let months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  let shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

  if (typeof date === 'undefined' || date === null) {
    // throw Error("Date is null! Please set Date as string");
    return '-';
  }

  if (typeof format === 'undefined') format = 'l, d F Y';

  let dateClass = typeof date == 'string' ? new Date(date) : date;
  let _format = format.split('');

  let result = '';

  let formats = {
    Y: dateClass.getFullYear().toString(),
    y: dateClass.getFullYear().toString().substring(1),
    l: days[dateClass.getDay()],
    D: shortDays[dateClass.getDay()],
    F: months[dateClass.getMonth()],
    M: shortMonths[dateClass.getMonth()],
    d: addZero(dateClass.getDate().toString()),
    m: addZero((dateClass.getMonth() + 1).toString()),
    n: (dateClass.getMonth() + 1).toString(),
    H: addZero(dateClass.getHours().toString()),
    i: addZero(dateClass.getMinutes().toString()),
    s: addZero(dateClass.getSeconds().toString()),
    w: dateClass.getDay(),
  };

  for (let i in _format) {
    let fm = _format[i];
    if (typeof formats[fm] !== 'undefined') result += formats[fm];
    else result += fm;
  }

  function addZero(value: any) {
    var val = parseInt(value);
    if (isNaN(val)) return value;

    return val < 10 ? '0' + val : val.toString();
  }

  return result;
};

export default FormatDate;
