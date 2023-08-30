import React, { useState } from "react";
import ChartOption from "./ChartOption";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchChartOptionAsync } from "./chartOptionSlice";
import MyCharTest from "./MyCharTest";
import { useTableContext } from "./TablePopupMarketwatch";

export const ChartContext = React.createContext<any>({})

const ChartWithOption = () => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<string>("a1d");
  const { code } = useAppSelector((state) => state.popupTable);
  const {updateParam} = useTableContext()

  const handleOption = (status: string,param: string) => {
    // dispatch(fetchChartOptionAsync({stockCode: code, action: action}))
    setType(status)
    updateParam(param)
  };
  return (
    <ChartContext.Provider value={{type}}>
      <div className="pu-content-chart">
      <div className="content-bt-time">
        <div className={`bt-zoom ${type === 'a1d' ? 'active':''}`} onClick={()=>handleOption("a1d","gw_realtime")}>
          <a id="a1d">
            <span>1d</span>
          </a>
        </div>
        <div className={`bt-zoom ${type === 'a1w' ? 'active':''}`} onClick={()=>handleOption("a1w","gw_history")}>
          <a id="a1w">
            <span>1w</span>
          </a>
        </div>
        <div className={`bt-zoom ${type === 'a3m' ? 'active':''}`} onClick={()=>handleOption("a3m","gw_history")}>
          <a id="a3m">
            <span>3m</span>
          </a>
        </div>
        <div className={`bt-zoom ${type === 'a6m' ? 'active':''}`} onClick={()=>handleOption("a6m","gw_history")}>
          <a id="a6m">
            <span>6m</span>
          </a>
        </div>
        <div className={`bt-zoom ${type === 'a1y' ? 'active':''}`} onClick={()=>handleOption("a1y","gw_history")}>
          <a id="a1y">
            <span>1y</span>
          </a>
        </div>
        <div className={`bt-zoom ${type === 'a2y' ? 'active':''}`} onClick={()=>handleOption("a2y","gw_history")}>
          <a id="a2y">
            <span>2y</span>
          </a>
        </div>
      </div>
      <ChartOption />
    </div>
    </ChartContext.Provider>
  );
};

export default ChartWithOption;
