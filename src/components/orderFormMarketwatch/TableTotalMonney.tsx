import React, { useEffect, useState } from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../utils/util';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { fetchClientBalence } from './ClientBalance';
import { fetchPermission } from '../header/ProfileAccountSlice';
import { Box, Skeleton, Typography } from '@mui/material';
import DivLoading from './component/DivLoading';

interface IMyProps {
  status: boolean,
  priceMoney?: number
}

const TableTotalMonney: React.FC<IMyProps> = ({ status, priceMoney }: IMyProps) => {
  const dispatch = useAppDispatch();
  const [isRotating, setIsRotating] = useState(false);

  const isLoading = useAppSelector((state) => state.clientBalance.isLoadingClientBalance);
  const dataMonney = useAppSelector((state) => state.clientBalance.ClientBalane);
  const statusKQ = useAppSelector((state) => state.clientBalance.statusKQ);
  const sttAccount = useAppSelector((state) => state.ProfileAccount.statusAccount);
  useEffect(() => {
    dispatch(fetchClientBalence());
    dispatch(fetchPermission());
  }, [dispatch]);
  const loadingBalance = () => {
    // Bắt đầu animation bằng cách đặt isRotating thành true
    setIsRotating(true);
    // Đợi một khoảng thời gian (1 giây trong ví dụ này) trước khi kết thúc animation
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
    dispatch(fetchClientBalence())
    // Thêm các tác vụ khác ở đây khi cần
  };
  const { t } = useTranslation(["home"]);
  const renderData = dataMonney?.Table?.[0] ?? null;
  // const renderData = dataMonney && dataMonney.Table && dataMonney.Table[0] ? dataMonney.Table[0] : null;
  // console.log(sttAccount === 2? true: false)
  // console.log(renderData,renderData?.AVAIL_FSAVING)
  const renderValue = (label: string, value: number | null,display:boolean,statusKQ?:boolean) => (
    display?
    <Box className={`bottom__sdTien__title ${statusKQ ? "hidden" : "flex" } justify-between text-13px`}>
      <Typography component="span" sx={{fontSize:13}} >{label}</Typography>
      <Typography component="span"  sx={{fontSize:13,fontWeight:700}}>{value !== null ? formatNumber(value) : '0'}</Typography>
    </Box>:""
  );
  return (
    <div className={`bottom__sdTien  mr-[1%] float-left SDTM ${status ? 'ml-[13%]' : 'absolute top-[110px] ml-[1%]'}`}>
      <div className="bg-[#b3b3b3] h-[25px]">
        <span className="px-2.5 text-[#0055ba] uppercase text-15px leading-[25px]">
          {t("home:Order.CASH_SDT")} 
        </span>
        {/* <CachedIcon style={{ color: '#1d60bc', fontSize: 18, fontWeight: 600, marginBottom: 2 }} onClick={()=> dispatch(fetchClientBalence())} /> */}
        <i className={`fa fa-refresh ${isRotating ? 'rotate' : ''} relative ml-[4px] text-[#1d60bc] !text-[15px] cursor-pointer top-[-1px]`}
      aria-hidden="true"
     
      onClick={loadingBalance}></i>
      </div>
      {renderData?
      <div className='text-13px'>
            {renderValue("Số dư tiền mặt:", renderData.TIENMAT,sttAccount===3 ? true :sttAccount===2?true:true)}
            {renderValue("Tiền ứng trước:", renderData.ACASHADVANCE,sttAccount===3 ? false :sttAccount===2?true:true)}
            {renderValue("Tiền bán CK chờ về:", renderData.ACASHADVANCE,sttAccount===3 ? true :sttAccount===2?false:false)}
            {renderValue(t("home:Order.CASH_TCFPTSV"), renderData.AFSAVING,sttAccount===3 ? true :sttAccount===2?true:true)}
            {renderValue("Sức mua từ CK còn lại:", renderData.AVAIL_STOCKVAL,sttAccount===3 ? true :sttAccount===2?false:false)}
            <div className="tt-t"></div>
            {renderValue("Số dư có thể giao dịch:", renderData.AVAIL_TRADINGCASH,sttAccount===3 ? false :sttAccount===2?true:true)}
            {renderValue("Sức mua cơ sở:", renderData.AVAIL_TRANSFER,sttAccount===3 ? true :sttAccount===2?false:false)}
            {renderValue("Sức mua tổng hợp:", renderData.AVAIL_TRADINGCASH,sttAccount===3 ? true :sttAccount===2?false:false)}
            {renderValue("Hạn mức còn lại:", renderData.REMAININGQUOTA,sttAccount===3 ? true :sttAccount===2?false:false)}
            {renderValue("Hạn mức KQ còn lại:", renderData.REMAININGQUOTA,sttAccount===3 ? false :sttAccount===2?true:false,!statusKQ)}

      </div>
      :   <Box>
         <DivLoading widthLeft="30%" widthRight="30%"/>
         <DivLoading widthLeft="40%" widthRight="25%"/>
         <DivLoading widthLeft="38%" widthRight="25%"/>
         <DivLoading widthLeft="37%" widthRight="25%"/>
         <div className="tt-t"></div>
         <DivLoading widthLeft="33%" widthRight="25%"/>
         <DivLoading widthLeft="35%" widthRight="25%"/>
         <DivLoading widthLeft="37%" widthRight="30%"/>
      </Box>
      }
    </div>
  );
}

export default React.memo(TableTotalMonney);


/* {sttAccount ===3 ? (
          <>
            {renderValue("Số dư tiền mặt:", renderData.TIENMAT)}
            {renderValue("Tiền bán CK chờ về:", renderData.ACASHADVANCE)}
            {renderValue(t("home:Order.CASH_TCFPTSV"), renderData.AVAIL_FSAVING)}
            {renderValue("Sức mua từ CK còn lại:", renderData.AVAIL_STOCKVAL)}
            <div className="tt-t"></div>
            {renderValue("Sức mua cơ sở:", renderData.AVAIL_TRANSFER)}
            {renderValue("Sức mua tổng hợp:", renderData.AVAIL_STOCKVAL)}
            {renderValue("Hạn mức còn lại:", renderData.REMAININGQUOTA)}
             
          </>
        ): sttAccount === 2 ?(
        <>
           {renderValue("Số dư tiền mặt:", renderData.TIENMAT)}
            {renderValue("Tiền ứng trước:", renderData.ACASHADVANCE)}
            {renderValue(t("home:Order.CASH_TCFPTSV"), renderData.AFSAVING)}
            <div className="tt-t"></div>
            {renderValue("Số dư có thể giao dịch:", renderData.AVAIL_TRADINGCASH)}
            {renderValue("Hạn mức KQ còn lại:", renderData.REMAININGQUOTA)}
        </>
        ) :
        sttAccount === 1 ?(<>
            {renderValue("Số dư tiền mặt:", renderData.TIENMAT)}
            {renderValue("Tiền ứng trước:", renderData.ACASHADVANCE)}
            {renderValue(t("home:Order.CASH_TCFPTSV"), renderData.AFSAVING)}
            <div className="tt-t"></div>
            {renderValue("Số dư có thể giao dịch:", renderData.AVAIL_TRADINGCASH)}
        
          </>) :
        (
          <>
            {renderValue("Số dư tiền mặt:", null)}
            {renderValue("Tiền bán CK chờ về:", null)}
            {renderValue(t("home:Order.CASH_TCFPTSV"), null)}
            {renderValue("Sức mua từ CK còn lại:", null)}
            {renderValue("Sức mua cơ sở:", null)}
            {renderValue("Sức mua tổng hợp:", null)}
            {renderValue("Hạn mức còn lại:", null)}
           
          </>
        )} */