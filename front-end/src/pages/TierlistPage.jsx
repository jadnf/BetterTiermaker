import {React, useState} from "react";
import {DndContext, 
  DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import TierlistContainer from "../components/TierlistContainer";
import UnrankedItemsContainer from "../components/UnrankedItemsContainer";
import Tier from "../components/Tier.jsx"; 
import UploadPhoto from "../components/PhotoImport";
import DraggableItem from "../components/DraggableItem.jsx";
import AddNewTier from "../components/AddNewTier.jsx";


export default function TierlistPage() {
    // const draggables = [1, 2, 3, 4, 5];
    const [tiers, setTiers] = useState({
        '0' : [],
        '1' : [],
        '2' : [],
        '3' : []
    });
    const [imgUrlLookup, setImgUrlLookup] = useState({
        "item-1": 'https://placehold.co/100x100?text=1' 
    });
    const [itemCount, setItemCount] = useState(1);
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
                <TierlistContainer tiers={tiers}> 
                    {Object.keys(tiers).map((tierId) => {
                        if(tierId == '0'){
                            return null;
                        }
                        return(<Tier key={tierId} id={tierId} items={tiers[tierId]} title={tierId} imgUrlLookup={imgUrlLookup} />)
                                    
                    })}
                </TierlistContainer>
                <UnrankedItemsContainer id="0" items={tiers['0']} imgUrlLookup={imgUrlLookup}/>
                
                <UploadPhoto onUpload={handleUpload} />

                <DragOverlay>
                    {activeId ? <DraggableItem id={activeId} imageUrl={imgUrlLookup[activeId]} /> : null}
                </DragOverlay>
                <AddNewTier onAdd={addNewTier} />
            </div>
        </DndContext>
    );

    function findContainer(id) {
        if (id in tiers) {
            return id;
        }
        return Object.keys(tiers).find((key) => tiers[key].includes(id));
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

        setTiers((prev) => {
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
                    tiers[activeContainer][activeIndex],
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

        const activeIndex = tiers[activeContainer].indexOf(active.id);
        const overIndex = tiers[overContainer].indexOf(over.id);

        if (activeIndex !== overIndex) {
            setTiers((prev) => ({
                ...prev,
                [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex),
            }));
        }

        setActiveId(null);
    }
    // End of AI-Assisted code

    function handleUpload(imageUrl) {
        let newItemId = "item-"+(itemCount+1);

        setTiers((prev) => ({
            ...prev,
            "0": [...prev["0"], newItemId]
        }));

        setImgUrlLookup((prev) => ({
            ...prev,
            [newItemId]: imageUrl
        }))

        setItemCount(itemCount+1);
    }

    function addNewTier() {
        setTiers((prev) => ({
            ...prev,
            [Object.keys(prev).length.toString()]: []
        }));
    }}