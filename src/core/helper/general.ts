import Router, { NextRouter, useRouter } from 'next/router';

export const pushForward = (link: string, query: any = {}) => {
  let queryParam = '';
  let isFirst = true;
  Object.keys(query).map((key) => {
    if (isFirst) {
      queryParam = `?${key}=${query[key]}`;
      isFirst = false;
      return;
    }
    queryParam += `&${key}=${query[key]}`;
  });
  Router.push(
    {
      pathname: null,
    },
    `${link}${queryParam}`,
    { shallow: true },
  );
};

export const useCustomRouter = () => {
  const router = useRouter();
  const urlSearchParams = new URLSearchParams(router.asPath.split('?')[1]);
  router.query = Object.fromEntries(urlSearchParams.entries());
  return router;
};

export const isLinkActive = (router: NextRouter, href: string): boolean => {
  if (href?.indexOf("?") != -1) return router.asPath == href || router.asPath.indexOf(href) != -1;
  return router.asPath == href;
}

export const setLink = (link: string, params?: {}): string => {
  let queryParams = "";
  if (params) queryParams = "?" + (new URLSearchParams(params).toString());
  return link + queryParams;
}

export const preventRedirect = (evt: any, router: any) => {
  evt.preventDefault();
  router.push(evt.currentTarget.href);
}

export const toNumber = (value: any, type: "int" | "float" = "int"): number => {
  if (typeof value === "number") return value;
  let parse = null;
  if (type == "int") parse = parseInt;
  else parse = parseFloat;

  value = parse(value);
  return isNaN(value) === false ? parse(value) : 0;
}

export const toRupiah = (amount: any, prefix: string = "Rp. "): string => {
  if (typeof amount === 'undefined' || amount == null || amount == "" || amount.length == 0 || amount == false) return `${prefix}0`;

  let formattedAmount = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));

  return `${prefix}${formattedAmount}`;
}

export const toTerbilang = (value: number, options: { prefix?: string, suffix?: string, typeChar?: "upper" | "lower" | "ucword" } = {
  typeChar: "upper",
  prefix: "",
  suffix: "Rupiah",
}): string => {

  if (value == 0) {
    return `${options?.prefix} Nol ${options?.suffix}`
  }

  const changeChar = (char: string): string => {
    if (char) {
      const typeChar = options.typeChar;
      if (typeChar == "lower") return char?.toLowerCase();
      else if (typeChar == "upper") return char?.toUpperCase();
      else return char;
    }
    return "";
  }
  const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  let temp = "";
  const isNegative: boolean = value < 0;

  value = isNegative ? Math.abs(value) : value;

  const convertToTerbilang = (valueNumber: number) => {
    let divider = 0;
    valueNumber = Math.floor(Math.abs(valueNumber));
    let tempValue = "";

    if (valueNumber < 12) {
      tempValue = ' ' + huruf[valueNumber];
    } else if (valueNumber < 20) {
      tempValue = convertToTerbilang(Math.floor(valueNumber - 10)) + ' Belas';
    } else if (valueNumber < 100) {
      divider = Math.floor(valueNumber / 10);
      tempValue = convertToTerbilang(divider) + ' Puluh' + convertToTerbilang(valueNumber % 10);
    } else if (valueNumber < 200) {
      tempValue = ' Seratus' + convertToTerbilang(valueNumber - 100);
    } else if (valueNumber < 1000) {
      divider = Math.floor(valueNumber / 100);
      tempValue = convertToTerbilang(divider) + ' Ratus' + convertToTerbilang(valueNumber % 100);
    } else if (valueNumber < 2000) {
      tempValue = ' Seribu' + convertToTerbilang(valueNumber - 1000);
    } else if (valueNumber < 1000000) {
      divider = Math.floor(valueNumber / 1000);
      tempValue = convertToTerbilang(divider) + ' Ribu' + convertToTerbilang(valueNumber % 1000);
    } else if (valueNumber < 1000000000) {
      divider = Math.floor(valueNumber / 1000000);
      tempValue = convertToTerbilang(divider) + ' Juta' + convertToTerbilang(valueNumber % 1000000);
    } else if (valueNumber < 1000000000000) {
      divider = Math.floor(valueNumber / 1000000000);
      tempValue = convertToTerbilang(divider) + ' Miliar' + convertToTerbilang(valueNumber % 1000000000);
    } else if (valueNumber < 1000000000000000) {
      divider = Math.floor(valueNumber / 1000000000000);
      tempValue = convertToTerbilang(valueNumber / 1000000000000) + ' Triliun' + convertToTerbilang(valueNumber % 1000000000000);
    }
    return tempValue;
  }

  temp = convertToTerbilang(value);

  return `${isNegative ? changeChar("Minus") : ""} ${options?.prefix} ${changeChar(temp)} ${changeChar(options?.suffix)}`;
}

export const timeAgo = (date: any): string => {

  let getDate: Date;
  if (typeof date === "string") {
    getDate = new Date(date);
  } else if (typeof date === "object") {
    getDate = date;
  } else {
    return "-";
  }
  const now = new Date();
  const seconds = Math.floor((now.getTime() - getDate?.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} tahun yang lalu`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} bulan yang lalu`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} hari yang lalu`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} jam yang lalu`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} menit yang lalu`;
  }
  return `${Math.floor(seconds)} detik yang lalu`;
}