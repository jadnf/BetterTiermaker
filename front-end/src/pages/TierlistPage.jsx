import {React, useState} from "react";
import {DndContext} from "@dnd-kit/core";
import TierlistContainer from "../components/TierlistContainer";
import UnrankedItemsContainer from "../components/UnrankedItemsContainer";
import Tier from "../components/Tier.jsx"; 
import DraggableItem from "../components/DraggableItem.jsx";

export default function TierlistPage() {
    // const draggables = [1, 2, 3, 4, 5];
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    const [parent, setParent] = useState("0");

    const draggableMarkup = (
        <DraggableItem id="1"></DraggableItem>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div>
                <h2>This is the Tierlist Page. wow, much tier, very list</h2>
                <p>This is where the tierlist will go, we need to implement DndContext on the tierlist container, then we need to create the tier components that implement Droppable, and the tieritem component that implements Draggable</p>
                <TierlistContainer> 
                    <Tier id="1">
                        {parent === "1" ? draggableMarkup : 'Drop here'}
                    </Tier>
                    <Tier id="2">
                        {parent === "2" ? draggableMarkup : 'Drop here'}
                    </Tier>                    
                    <Tier id="3">
                        {parent === "3" ? draggableMarkup : 'Drop here'}
                    </Tier>                
                </TierlistContainer>
                <UnrankedItemsContainer id="0">
                    {/* <DraggableItem id="1"/> 
                    <DraggableItem id="2"/>
                    <DraggableItem id="3"/>
                    <DraggableItem id="4"/>
                    <DraggableItem id="5"/> */}

                    {parent === "0" ? draggableMarkup : 'Drop here'}
                </UnrankedItemsContainer>
            </div>
        </DndContext>
    );

    function handleDragEnd(event) {
        const {over} = event;

        setParent(over ? over.id : null);
    }
}