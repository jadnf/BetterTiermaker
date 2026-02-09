import React from "react";
import {DndContext} from "@dnd-kit/core";
import TierlistContainer from "../components/TierlistContainer";
import UnrankedItemsContainer from "../components/UnrankedItemsContainer";

export default function TierlistPage() {



    return (
        <DndContext>
            <div>
                <h2>This is the Tierlist Page. wow, much tier, very list</h2>
                <p>This is where the tierlist will go, we need to implement DndContext on the tierlist container, then we need to create the tier components that implement Droppable, and the tieritem component that implements Draggable</p>
                <TierlistContainer />
                <UnrankedItemsContainer />
            </div>
        </DndContext>
    )
}

