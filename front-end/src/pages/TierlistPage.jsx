import {React, useState} from "react";
import {DndContext} from "@dnd-kit/core";
import TierlistContainer from "../components/TierlistContainer";
import UnrankedItemsContainer from "../components/UnrankedItemsContainer";
import Tier from "../components/Tier.jsx"; 
import DraggableItem from "../components/DraggableItem.jsx";

export default function TierlistPage() {
    // const draggables = [1, 2, 3, 4, 5];
    const [items, setItems] = useState({
        0 : ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
        1 : [],
        2 : [],
        3 : []
    });
    const [parent, setParent] = useState(0);


    return (
        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div>
                <h2>This is the Tierlist Page. wow, much tier, very list</h2>
                <p>This is where the tierlist will go, we need to implement DndContext on the tierlist container, then we need to create the tier components that implement Droppable, and the tieritem component that implements Draggable</p>
                <TierlistContainer > 
                    <Tier id={1} items={items[1]}>
                    </Tier>
                    <Tier id={2} items={items[2]}>
                    </Tier>                    
                    <Tier id={3} items={items[3]}>
                    </Tier>                
                </TierlistContainer>
                <UnrankedItemsContainer id={0} items={items[0]}>
                    {console.log(items[0])}
                    {/* <DraggableItem id="1"/> 
                    <DraggableItem id="2"/>
                    <DraggableItem id="3"/>
                    <DraggableItem id="4"/>
                    <DraggableItem id="5"/> */}

                    
                </UnrankedItemsContainer>
            </div>
        </DndContext>
    );

    function handleDragEnd(event) {
        const {over} = event;

        setParent(over ? over.id : parent);
    }

    function findContainer(id) {
        if (id in items) {
            return id;
        }
      
        return Object.keys(items).find((key) => items[key].includes(id));
    }

    function handleDragOver(event) {
        const {active, over} = event;
        const overId = over?.id;

        if(!overId) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(overId);

        if (activeContainer !== overContainer) {
            setItems((prev) => {
                const activeItems = prev[activeContainer];
                const overItems = prev[overContainer];

                // Logic to remove from activeItems and add to overItems
                return {
                    ...prev,
                    [activeContainer]: activeItems.filter((item) => item !== active.id),
                    [overContainer]: [...overItems, active.id],
                };
            });
        }

    }

    
}