import React from "react";
import Sidebar from "./sidebar";
import { useConversations } from "../contexts/conversation";
import OpenConversation from "./openConversation";

export type DashBoardPropsT = {
  id: string;
};

const Dashboard = (props: DashBoardPropsT) => {
  const { selectedConversation } = useConversations();
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={props.id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
};

export default Dashboard;
