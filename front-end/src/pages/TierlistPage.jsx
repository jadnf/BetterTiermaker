import {React, useState} from "react";
import {DndContext, 
  DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import TierlistContainer from "../components/TierlistContainer";
import UnrankedItemsContainer from "../components/UnrankedItemsContainer";
import Tier from "../components/Tier.jsx"; 

export default function TierlistPage() {
    // const draggables = [1, 2, 3, 4, 5];
    const [items, setItems] = useState({
        '0' : ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
        '1' : [],
        '2' : [],
        '3' : []
    });
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div>
                <TierlistContainer > 
                    <Tier id="1" items={items['1']}>
                    </Tier>
                    <Tier id="2" items={items['2']}>
                    </Tier>                    
                    <Tier id="3" items={items['3']}>
                    </Tier>                
                </TierlistContainer>
                <UnrankedItemsContainer id="0" items={items['0']}>
                    
                </UnrankedItemsContainer>
                <DragOverlay>
                    {activeId ? <div className="draggable-item">{activeId}</div> : null}
                </DragOverlay>
            </div>
        </DndContext>
    );


    function findContainer(id) {
        if (id in items) {
            return id;
        }
        return Object.keys(items).find((key) => items[key].includes(id));
    }


    function handleDragStart(event) {
        setActiveId(event.active.id);
    }
    
    // following Drag / Drop methods created with the help of Gemini 3 Pro
    function handleDragOver(event) {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId || active.id === overId) return;

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return;
        }

        setItems((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];
            const activeIndex = activeItems.indexOf(active.id);
            const overIndex = overItems.indexOf(overId);

            let newIndex;

            if (overId in prev) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item !== active.id)
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            };
        });
    }


    function handleDragEnd(event) {
        const { active, over } = event;
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over?.id);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = items[activeContainer].indexOf(active.id);
        const overIndex = items[overContainer].indexOf(over.id);

        if (activeIndex !== overIndex) {
            setItems((prev) => ({
                ...prev,
                [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex),
            }));
        }

        setActiveId(null);
    }
    // End of AI-Assisted code

}