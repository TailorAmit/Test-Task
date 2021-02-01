import React from "react";
import _ from "lodash";

interface Props {
  CompareData: any;
}

export const CompareDates: React.FC<Props> = ({ CompareData }) => {
  let DateObj = _.map(CompareData, "launch_date_local");
  let Date1 = new Date(DateObj[0]);
  let Date2 = new Date(DateObj[1]);
  let result: any = {};
  if (Date1.getTime() < Date2.getTime()) {
    result = _.find(CompareData, (d) => d.launch_date_local === DateObj[1]);
  } else if (Date1.getTime() > Date2.getTime())
    result = _.find(CompareData, (d) => d.launch_date_local === DateObj[0]);
  else {
    result = { mission_name: "both are same" };
  }
  return (
    <div className="main-container" style={{ margin: "50px" }}>
      {result?.mission_name || ""}
    </div>
  );
};
