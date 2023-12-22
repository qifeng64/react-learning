import React from "react";
import DraggableSidebar from "./cpn/DraggableSidebar";
import Item from "./cpn/Item";
import TopBar from "./cpn/TopBar";

import "./styles.css";

export default function App() {
    console.log("App render");
    return (
        <DraggableSidebar>
            <TopBar></TopBar>
            <Item></Item>
        </DraggableSidebar>
    );
}
