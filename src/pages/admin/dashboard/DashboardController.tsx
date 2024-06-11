import React from "react";
import DashboardView from "./DashboardView";
import { useQuery } from "react-query";
import { getAdminStatisticalTransaction } from "@/service/transactions";

const DashboardController = () => {
  const { data }: any = useQuery("statistical_line", {
    queryFn: () => getAdminStatisticalTransaction(),
  });
  console.log(data);
  return (
    <>
      <DashboardView
        rechanrgeTotals={
          data !== undefined && data.status == 0
            ? data.rechanrgeTotals
            : [0, 0, 0, 0, 0, 0, 0]
        }
        withdrawTotals={
          data !== undefined && data.status == 0
            ? data.withdrawTotals
            : [0, 0, 0, 0, 0, 0, 0]
        }
      />
    </>
  );
};

export default DashboardController;
