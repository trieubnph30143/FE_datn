import { useEffect, useState } from "react";
import MyWalletView from "./MyWalletView";
import { useQuery, useQueryClient } from "react-query";
import {  getUserWallet, updateWallet } from "@/service/wallet";
import { useLocalStorage } from "@/hooks/useStorage";
import {
  addTransactions,
  getOneTransaction,
  getUserStatisticalTransaction,
  getUserTransaction,
  updateTransaction,
} from "@/service/transactions";
import { getVnpay } from "@/service/vnpay";
import { toast } from "react-toastify";
import { getOneUser } from "@/service/auth";
import { io } from "socket.io-client";
import { addNotify } from "@/service/notify";
import { convertToVND } from "@/utils/utils";
const MyWalletController = () => {
  const socket = io("http://localhost:4000");
  const [value, setValue]: any = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState(false);
  const [rechanrge, setRechanrge] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [stk, setStk] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");

  const [dataEmail, setDataEmail]: any = useState([]);
  const [transfer, setTransfer] = useState("");
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const queryParams = new URLSearchParams(location.search);
  const paramTransactionStatus = queryParams.get("vnp_TransactionStatus");
  const paramOrder_id = queryParams.get("order_id");
  const [user, setUser]: any = useLocalStorage("user", {});
  let count = 0;
  
  const queryClient = useQueryClient();
  const { data }: any = useQuery("wallet", {
    queryFn: () => {
      if (user.data[0]._id) {
        return getUserWallet(user.data[0]._id);
      }
    },
    refetchOnWindowFocus: false,
  });
  const { data: transtion }: any = useQuery("transtion", {
    queryFn: () => {
      if (user.data[0]._id) {
        return getUserTransaction(user.data[0]._id);
      }
    },
    refetchOnWindowFocus: false,
  });

  const { data: statistical }: any = useQuery("statistical", {
    queryFn: () => {
      if (user.data[0]._id) {
        return getUserStatisticalTransaction(user.data[0]._id);
      }
    },
    refetchOnWindowFocus: false,
  });
  console.log(statistical);
  useEffect(() => {
    (async () => {
      let message = "";
      if (paramTransactionStatus) {
        let check: any = await getStatusTransaction();
        console.log(check);
        if (check) {
          if (count == 0) {
            toast.success("không nên sử dụng lại url này");
            count++;
          }
        } else {
          switch (paramTransactionStatus) {
            case "00":
              message += "Giao dịch thành công";
              break;
            case "01":
              message += "Giao dịch chưa hoàn tất";
              break;
            case "02":
              message += "Giao dịch bị lỗi";
              break;
            case "04":
              message +=
                "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)";
              break;
            case "05":
              message += "VNPAY đang xử lý giao dịch này (GD hoàn tiền)";
              break;
            case "06":
              message +=
                "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)";
              break;
            case "07":
              message += "Giao dịch bị nghi ngờ gian lận";
              break;
            case "09":
              message += "GD Hoàn trả bị từ chối";
              break;

            default:
              break;
          }
          if (message == "Giao dịch thành công") {
            if (count == 0) {
              let amount: any = await updateStatusTransaction(
                "completed",
                "rechanrge"
              );
              if (amount) {
                socket.emit("getNewNotify", {
                  user_id: user.data[0]._id,
                });
                await updateWalletSuccess(amount, user.data[0]._id);
                toast.success(message);
                count++;
              }
            }
          } else {
            if (count == 0) {
              await updateStatusTransaction("failed", "rechanrge");
              queryClient.invalidateQueries({
                queryKey: ["wallet"],
              });
              queryClient.invalidateQueries({
                queryKey: ["transtion"],
              });
              toast.error(message);
              count++;
            }
          }
        }
      }
    })();
  }, []);
  const updateStatusTransaction = async (status: any, type: any) => {
    try {
      let data = await updateTransaction({
        _id: paramOrder_id,
        status: status,
        type: type,
      });
      if (data?.status == 0) {
        return Number(data.data.amount);
      }
    } catch (error) {}
  };
  const updateWalletSuccess = async (
    amount: any,
    user_id: any,
    transfer?: any
  ) => {
    try {
      let wallet = await getUserWallet(user_id);
      if (wallet?.status == 0) {
        let res = await updateWallet({
          _id: wallet.data[0]._id,
          user_id: [wallet.data[0].user_id[0]],
          balance: transfer ? amount : Number(wallet.data[0].balance) + amount,
        });
        if (res?.status == 0) {
          queryClient.invalidateQueries({
            queryKey: ["wallet"],
          });
          queryClient.invalidateQueries({
            queryKey: ["transtion"],
          });
        }
      }
    } catch (error) {}
  };
  const getStatusTransaction = async () => {
    try {
      let data = await getOneTransaction(paramOrder_id);

      if (data?.status == 0 && data.data.status == "completed") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleRechanrge = async () => {
    try {
      let data = await addTransactions({
        user_id: [user.data[0]._id],
        type: "rechanrge",
        status: "pending",
        amount: rechanrge,
      });
      if (data?.status == 0) {
        let url: any = await getVnpay({
          order_id: data.data._id,
          amount: rechanrge,
          type: "wallet",
        });
        if (url) {
          window.location.href = url;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchEmail = async () => {
    try {
      if (searchEmail == user.data[0].email) {
        toast.warning("Không tìm Email chính mình");
      } else {
        let data = await getOneUser(searchEmail);
        if (data?.status == 0) {
          setDataEmail(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleTrander = async () => {
    try {
      if (Number(data.data[0].balance) - Number(transfer) >= 0) {
        let transactionsUser = await addTransactions({
          user_id: [user.data[0]._id],
          type: "transfer",
          status: "completed",
          amount: transfer,
          email_transfer: `Email Chuyển : ${dataEmail[0].email}`,
        });
        let transactionsTranfer = await addTransactions({
          user_id: [dataEmail[0]._id],
          type: "transfer",
          status: "completed",
          amount: transfer,
          email_transfer: `Email nhận : ${user.data[0].email}`,
        });
        let wallet = await getUserWallet(dataEmail[0]._id);
        if (transactionsUser?.status == 0 && transactionsTranfer?.status == 0) {
          await updateWalletSuccess(
            Number(data.data[0].balance) - Number(transfer),
            user.data[0]._id,
            true
          );
          await updateWalletSuccess(
            wallet?.data[0].balance + Number(transfer),
            dataEmail[0]._id,
            true
          );
         
           await addNotify({
            user_id: [dataEmail[0]._id],
            title: "Ví của bạn.",
            message: `Bạn vừa nhận ${convertToVND(
              transfer
            )} vào ví của mình được chuyển từ tài khoản có email là ${
              user.data[0].email
            }.`,
            url: "/my_wallet",
            read: false,
          });
           await addNotify({
            user_id: [user.data[0]._id],
            title: "Ví của bạn.",
            message: `Bạn vừa chuyển ${convertToVND(
             transfer
            )} vào ví của tài khoản có email là ${dataEmail[0].email}.`,
            url: "/my_wallet",
            read: false,
          });
          
          toast.success("Chuyển tiền thành công");
          setTransfer("");
            setTimeout(()=>{
              socket.emit("getNewNotify", {
                user_id: dataEmail[0]._id,
              });
            },1000)
            socket.emit("getNewNotify", {
              user_id: user.data[0]._id,
            });
         
          queryClient.invalidateQueries({
            queryKey: ["wallet"],
          });
          queryClient.invalidateQueries({
            queryKey: ["transtion"],
          });
        }
      } else {
        toast.warning("Bạn không đủ số dư");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = async () => {
    try {
      if (Number(data.data[0].balance) - Number(amount) >= 0) {
        let transactions = await addTransactions({
          user_id: [user.data[0]._id],
          type: "withdraw",
          status: "pending",
          amount: amount,
          stk: stk,
          bankAccount: bank,
        });
        if (transactions?.status == 0) {
          updateWalletSuccess(
            Number(data.data[0].balance) - Number(amount),
            user.data[0]._id,
            true
          );
          queryClient.invalidateQueries({
            queryKey: ["wallet"],
          });
          queryClient.invalidateQueries({
            queryKey: ["transtion"],
          });
          toast.success("Thành công");
        }
      } else {
        toast.warning("Bạn không đủ số dư");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <MyWalletView
        handleRechanrge={handleRechanrge}
        wallet={
          data !== undefined &&
          Object.keys(data)[0] &&
          data.status == 0 &&
          data.data
        }
        transtions={
          transtion !== undefined &&
          Object.keys(transtion)[0] &&
          transtion.status == 0 &&
          transtion.data
        }
        handleChangeTabs={handleChangeTabs}
        handleChange={handleChange}
        toggleDrawer={toggleDrawer}
        open={open}
        expanded={expanded}
        value={value}
        setRechanrge={setRechanrge}
        rechanrge={rechanrge}
        setSearchEmail={setSearchEmail}
        searchEmail={searchEmail}
        handleSearchEmail={handleSearchEmail}
        dataEmail={dataEmail}
        setTransfer={setTransfer}
        transfer={transfer}
        handleTrander={handleTrander}
        stk={stk}
        setStk={setStk}
        amount={amount}
        setAmount={setAmount}
        bank={bank}
        setBank={setBank}
        handleWithdraw={handleWithdraw}
      />
    </>
  );
};

export default MyWalletController;
