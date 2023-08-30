import React from "react";
import { IpropsTableReport } from "./TableAssetReport";
import { formatNumber, formatNumbertoDecimal } from "../../utils/util";
import { useAppSelector } from "../../store/configureStore";

const TableAssetReportShort: React.FC<IpropsTableReport> = ({
  short,
  setShort,
  handleSort,
  label,
  sort,
  data,
}: IpropsTableReport) => {
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const { assetReport } = useAppSelector((state) => state.assetReport);
  // Tong thanh tien
  const totalThanhTien = React.useMemo(()=> {
    return assetReport?.Table1?.reduce((a: any, b: any) => a + b.AMARKET_VALUE,0)
  },[assetReport?.Table1])

  // Tong lai/lo
  const totalLaiLo = React.useMemo(()=> {
    return assetReport?.Table1?.reduce((a: any, b: any) => a + b.APROFIT_LOSS_RATE, 0)
  },[assetReport?.Table1])

  // Tong gia von
  const totalGiaVon = React.useMemo(() => {
    return assetReport?.Table1?.reduce((a: any, b: any) => a + b.AROOT_VALUE,0)
  }, [assetReport?.Table1])

  return (
    <table className="w-full border-collapse text-center my-0 mx-auto bg-white text-[#002060] border-spacing-0">
      <thead className="table_detail_BCTS_thead bg-red-500">
        <tr>
          <td colSpan={6} className="text-left">
            <div>
              <span className="font-bold text-black cursor-default">
                CHI TIẾT CHỨNG KHOÁN{" "}
                <span
                  className="font-medium text-normalText text-sm cursor-pointer underline italic"
                  onClick={() => setShort(!short)}
                >
                  (Xem đầy đủ)
                </span>
              </span>
            </div>
          </td>
          <td colSpan={4}>
            <div>
              <strong className="text-black">LÃI/LỖ DỰ KIẾN</strong>
            </div>
          </td>
        </tr>
        <tr>
          <td
            className={`text-xs font-bold ${
              label !== "ASTOCKCODE"
                ? "tablesorter"
                : label === "ASTOCKCODE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "5%" }}
            onClick={() => handleSort("ASTOCKCODE")}
          >
            <div>Mã CK</div>
          </td>
          <td
            className={`text-xs font-bold ${
              label !== "ATRADING_READY_TOTAL"
                ? "tablesorter"
                : label === "ATRADING_READY_TOTAL" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "6%" }}
            onClick={() => handleSort("ATRADING_READY_TOTAL")}
          >
            <div>CK có sẵn</div>
          </td>
          <td
            className={`text-xs font-bold ${
              label !== "AWAIT_REC_RIGHT"
                ? "tablesorter"
                : label === "AWAIT_REC_RIGHT" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "6%" }}
            onClick={() => handleSort("AWAIT_REC_RIGHT")}
          >
            <div>CK chở về </div>
          </td>
          <td
            className={`text-xs font-bold ${
              label !== "ATOTAL_AMOUNT"
                ? "tablesorter"
                : label === "ATOTAL_AMOUNT" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "5%" }}
            onClick={() => handleSort("ATOTAL_AMOUNT")}
          >
            <div>Tổng KL</div>
          </td>
          <td className="text-xs font-bold" style={{ width: "5%" }}>
            <div>Giá TT</div>
          </td>
          <td
            className={`text-xs font-bold ${
              label !== "AMARKET_VALUE"
                ? "tablesorter"
                : label === "AMARKET_VALUE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "6%" }}
            onClick={() => handleSort("AMARKET_VALUE")}
          >
            <div>Thành tiền </div>
          </td>
          <td className="text-xs font-bold" style={{ width: "5%" }}>
            <div>Giá vốn TB</div>
          </td>
          <td
            className={`text-xs font-bold ${
              label !== "AROOT_VALUE"
                ? "tablesorter"
                : label === "AROOT_VALUE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "8%" }}
            onClick={() => handleSort("AROOT_VALUE")}
          >
            <div>Tổng giá vốn</div>
          </td>
          <td
            className={`text-xs font-bold  ${
              label !== "APROFIT_LOSS_VAL"
                ? "tablesorter"
                : label === "APROFIT_LOSS_VAL" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "5%" }}
            onClick={() => handleSort("APROFIT_LOSS_VAL")}
          >
            <div>Lãi/Lỗ </div>
          </td>
          <td
            className={`text-xs font-bold ${
              label !== "APROFIT_LOSS_RATE"
                ? "tablesorter"
                : label === "APROFIT_LOSS_RATE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "5%" }}
            onClick={() => handleSort("APROFIT_LOSS_RATE")}
          >
            <div>% Lãi/Lỗ </div>
          </td>
        </tr>
      </thead>
      <tbody>
        {data?.map((item: any, index: number) => (
          <tr key={item.ASTOCKCODE}>
            <td className={`!text-center !text-xs ${mode}-text`}>
              {item.ASTOCKCODE}
            </td>
            <td className={`${mode}-text !text-xs`}>
              {item.ATRADING_READY_TOTAL}
            </td>
            <td className={`${mode}-text !text-xs`}>
              {item.ATRANSFER_RESTRICTED}
            </td>
            <td className={`${mode}-text !text-xs`}>{item.ATOTAL_AMOUNT}</td>
            <td className={`${mode}-text !text-xs`}>
              {formatNumber(item.AMARKET_PRICE)}
            </td>
            <td className={`${mode}-text !text-xs`}>
              {formatNumber(item.AMARKET_VALUE)}
            </td>
            <td className={`${mode}-text !text-xs`}>
              {formatNumber(item.AAVG_PRICE)}
            </td>
            <td className={`${mode}-text !text-xs`}>
              {formatNumber(item.AROOT_VALUE)}
            </td>
            {/* Lai/lo */}
            <td
              className={`!text-xs ${item.APROFIT_LOSS_VAL === 0 ? 'text-black' : item.APROFIT_LOSS_VAL < 0 ? "!text-[#FF0000]" : "!text-[#00b050]"}`}
            >
              {formatNumber(item.APROFIT_LOSS_VAL)}
            </td>
            {/* % Lai/lo */}
            <td
              className={`!text-xs ${item.APROFIT_LOSS_RATE === 0 ? 'text-black' : item.APROFIT_LOSS_RATE < 0 ? "!text-[#FF0000]": "!text-[#00b050]"}`}
            >
              {formatNumbertoDecimal(item.APROFIT_LOSS_RATE)}%
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr role="row">
          <td className="!text-left uppercase font-bold !text-xs" colSpan={5}>
            TỔNG
          </td>
          {/* Tong TT */}
          <td className="font-bold !text-xs">
            {assetReport?.Table1?.length ===0 ? 0 : formatNumber(totalThanhTien)}
          </td>
          <td className="!text-xs"></td>
           {/* Tong gia von */}
          <td className="font-bold !text-xs">
            {assetReport?.Table1?.length ===0 ? 0: formatNumber(totalGiaVon)}
          </td>
          {/* Tong Lai/lo */}
          <td
            className={`!text-xs font-bold ${totalLaiLo === 0 ? 'text-black' : totalLaiLo < 0 ? "!text-[#FF0000]" : "!text-[#00b050]"}`}
          >
            {assetReport?.Table1?.length ===0 ? 0 : formatNumber(totalLaiLo)}
          </td>
          {/* Tong % Lai/lo */}
          <td
            className={`!text-xs font-bold ${isNaN(totalLaiLo / totalGiaVon) ? 'text-black' : totalLaiLo / totalGiaVon < 0 ? "!text-[#FF0000]" : "!text-[#00b050]"}`}
          >
            {assetReport?.Table1?.length === 0 ? 0 : isNaN(totalLaiLo / totalGiaVon) ? '-' :formatNumbertoDecimal(totalLaiLo / totalGiaVon) + '%'}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TableAssetReportShort;
  