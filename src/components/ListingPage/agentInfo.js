import React from "react";
import mailIcon from "../../assets/mailIcon.png";
import phoneIcon from "../../assets/phoneIcon.png";

const AgentInfo = ({ agent }) => {
  return (
    <div
      className="w-[503px] h-[174px] radius-[8px] relative rounded-[8px] top-[40px]"
      style={{ border: "1px solid rgba(219, 219, 219, 1)" }}
    >
      <img
        className="rounded-[100px] w-[72px] h-[72px] absolute top-[24px] left-[20px]"
        src={agent.avatar}
        alt={`${agent.name} ${agent.surname}`}
      />
      <p className="absolute top-[40px] left-[106px]">
        {agent.name} {agent.surname}
      </p>
      <p
        className="absolute top-[63px] left-[106px] text-[14px]"
        style={{ color: "rgba(128, 138, 147, 1)" }}
      >
        აგენტი
      </p>
      <p
        className="absolute top-[112px] left-[20px] flex items-center gap-[5px]"
        style={{ color: "rgba(128, 138, 147, 1)" }}
      >
        <img src={mailIcon} className="w-[16px] h-[13px]" alt="email" /> {agent.email}
      </p>
      <p
        className="absolute top-[133px] left-[20px] flex items-center gap-[5px]"
        style={{ color: "rgba(128, 138, 147, 1)" }}
      >
        <img src={phoneIcon} className="w-[13px] h-[13px]" alt="phone" /> {agent.phone}
      </p>
    </div>
  );
};

export default AgentInfo;
