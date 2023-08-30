import { chartIndex } from "../../../models/chartIndex";
var xmin, xmax;
var g_IsWorkingDay;

var c_strVNXALL = "VNXALL", //2016-10-31 11:51:11 NamLD update VNXALL
  c_strVNIndex = "VNI",
  c_strVN30 = "VN30",
  c_strVN100 = "VN100",
  c_strVNALL = "VNALL",
  c_strVNMID = "VNMID",
  c_strVNSML = "VNSML",
  c_strHNX30 = "i41",
  c_strHNX30TRI = "i51",
  c_strHNXCon = "i311",
  c_strHNXFin = "i39",
  c_strHNXIndex = "i02",
  c_strHNXLCap = "i26",
  c_strHNXMSCap = "i28",
  c_strHNXMan = "i310",
  c_strHNXUpcomIndex = "i03",
  c_strHNXUpcomPremium = "i218"; //2016-07-14 10:35:12 NamLD update Upcom Premium

var c_strhourOPENMKT = 9,
  c_strhourCLOSEMKT = 15;
export function initXDatetime(objCInitData: chartIndex) {
  var today = new Date();
  var hh = today.getHours();
  var mi = today.getMinutes();
  var g_IsWorkingDay = objCInitData.IsWorkingDay;
  //g_IsWorkingDay = "0"; //TEST ngay nghi, ngay le tet
  if (
    g_IsWorkingDay == "0" ||
    (g_IsWorkingDay == "1" && (hh < 8 || (hh == 8 && mi <= 15)))
  ) {
    var HNX30, VNI;
    HNX30 = objCInitData.HNX.DataFull.HNX30;
    VNI = objCInitData.HSX.DataFull.VNIndex;
    if (HNX30.length != 0) {
      xmin = HNX30[0].Data.TimeJS;
      xmax = HNX30[HNX30.length - 1].Data.TimeJS;
    } else {
      // 2021-07-03 14:19:56 ngocta2 fix error so am, pool tra client 0-size array
      if (VNI.length > 0) {
        xmin = VNI[0].Data.TimeJS;
        xmax = VNI[VNI.length - 1].Data.TimeJS;
      }
    }
  } // (g_IsWorkingDay == "1")
  else {
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    var HH1 = c_strhourOPENMKT;
    var HH2 = c_strhourCLOSEMKT;
    var MM = 0; // minute

    var xminTmp = new Date(yyyy, mm, dd, HH1, MM);
    var xmaxTmp = new Date(yyyy, mm, dd, HH2, MM);

    xmin = _getDateTs(xminTmp);
    xmax = _getDateTs(xmaxTmp);
  }
}
export function _getDateTs(dateTime: any) {
  const regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/;

  if (regex.test(dateTime)) {
    const inputDate = dateTime.split(" ");
    const dateArr = inputDate[0].split("-");
    return new Date(dateArr[0], dateArr[1], dateArr[2]).getTime();
  }

  let d;
  d = new Date(dateTime).getTime();
  return d; 
}

export function drawChart(data: any): any {
  const arrVol = data?.Body?.map((item: any) => ({
    MQ: item?.MQ,
    MP: item?.MP,
  }));
  const arr = arrVol?.reduce((acc: any, curr: any) => {
    const exist = acc.find((item: any) => item.MP === curr.MP);
    if (exist) {
      exist.MQ += curr.MQ;
    } else {
      acc.push({ MP: curr.MP, MQ: curr.MQ });
    }
    return acc;
  }, []);
  return arr;
}

export function getTimeString(time:any){
  const date = new Date(time).getDate();
  const month = new Date(time).getMonth() + 1;
  const year = new Date(time).getFullYear();
  return `${month > 9 ? month : `0${month}`}/${date > 9 ? date : `0${date}`}/${year}`;
}
export function getTimeStamp(str: string) {
  const datePart = str.split(" ")[0];
  const parts = datePart.split("/");
  const dateObject = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  return dateObject.getTime();
}

export function drawChartOption(arr: any, type: string) {
  console.log({arr});
  
  if (arr?.length === 0) {
    return [];
  } else {
    let time_start, time_end, date, month, year;

    let arr_data: any = [];

    time_end = _getDateTs(arr[arr.length - 1][0]);

    date = new Date(time_end).getDate();

    month = new Date(time_end).getMonth();

    year = new Date(time_end).getFullYear();

    switch (type) {
      case "a1d":
        return arr;

      case "a1w":
        time_start = new Date(year, month, date - 7).getTime();

        for (let i = 0; i < arr.length; i++) {
          if (_getDateTs(arr[i][0]) >= time_start) {
            arr_data.push(arr[i]);
          }
        }

        return arr_data;

      case "a3m":
        time_start = new Date(year, month - 3, date).getTime();

        for (let i = 0; i < arr.length; i++) {
          if (_getDateTs(arr[i][0]) >= time_start) {
            arr_data.push(arr[i]);
          }
        }

        return arr_data;

      case "a6m":
        time_start = new Date(year, month - 6, date).getTime();

        for (let i = 0; i < arr.length; i++) {
          if (_getDateTs(arr[i][0]) >= time_start) {
            arr_data.push(arr[i]);
          }
        }

        return arr_data;

      case "a1y":
        time_start = new Date(year, month - 12, date).getTime();

        for (let i = 0; i < arr.length; i++) {
          if (_getDateTs(arr[i][0]) >= time_start) {
            arr_data.push(arr[i]);
          }
        }

        return arr_data;

      case "a2y":
        time_start = new Date(year, month - 24, date).getTime();

        for (let i = 0; i < arr.length; i++) {
          if (_getDateTs(arr[i][0]) >= time_start) {
            arr_data.push(arr[i]);
          }
        }

        return arr_data;

      default:
        return arr;
    }
  }
}
export function minNumber(arr: any): number {
  let minNum = arr[0];
  if (arr.length === 1) {
    minNum = arr[0];
  } else {
    for (let i = 1; i < arr.length; i++) {
      if (minNum > arr[i]) {
        minNum = arr[i];
      }
    }
  }
  return minNum;
}

export function maxNumber(arr: any): number {
  let maxNum = arr[0];
  if (arr.length === 1) {
    maxNum = arr[0];
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (maxNum < arr[i]) {
        maxNum = arr[i];
      }
    }
  }
  return maxNum;
}
