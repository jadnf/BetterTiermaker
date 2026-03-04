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
import {saveTierListToJSONFile, loadTierListFromJSONFIle} from "../utils/JSONUtils.js";


export default function TierlistPage() {
    // const draggables = [1, 2, 3, 4, 5];
    const [name, setName] = useState("My Tierlist");
    const [tiers, setTiers] = useState({
        '0' : [],
        '1' : [],
        '2' : [],
        '3' : []
    });
    const [tierOrder, setTierOrder] = useState(['1', '2', '3']);
    const [tiersData, setTiersData] = useState({
        '1' : {
            title : 'S',
            labelColor: "#c73329"
        },
        '2' : {
            title : 'A',
            labelColor: "#509d2f"
        },
        '3' : {
            title : 'B',
            labelColor: "#afe222"
        }
    });
    const [itemsData, setItemsData] = useState({});
    const [tierCount, setTierCount] = useState(3);
    const [activeId, setActiveId] = useState(null);
    const [activeType, setActiveType] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div>
                <TierlistContainer tierOrder={tierOrder} tiersData={tiersData} setTiersData={setTiersData} tiers={tiers} itemsData={itemsData} removeTier={removeTier} updateItemLabel={updateItemLabel} deleteItem={deleteItem} />
                
                <DragOverlay>
                    {dragOverlayLogic()}
                </DragOverlay>
                <div className="utility-container">
                    <UnrankedItemsContainer id="0" items={tiers['0']} itemsData={itemsData} />
                    <div className="file-stuff">
                        <div>
                            <h4>Import image</h4>
                            <UploadPhoto onUpload={handleUpload} />
                        </div>
                        <div>
                            <h4>Save to JSON</h4> <br></br>
                            <button onClick={() => saveTierListToJSONFile(name, tiers, tierOrder, tiersData, itemsData, tierCount)}>Download Tierlist</button>
                        </div>
                        <div>
                            <h4>Load from JSON</h4> <br></br>
                            <input type="file" accept="application/json,.json" onChange={handleLoadTierlist} />
                        </div>
                    </div>
                </div>
                
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
        setActiveType(event.active.data.current?.type);
    }
    
    // following Drag / Drop methods created with the help of Gemini 3 Pro
    function handleDragOver(event) {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId || active.id === overId) return;
        if (active.data.current?.type === "Tier") return;

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
                    prev[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            };
        });
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over) return;

        if (active.data.current?.type === "Tier") {
            if (active.id !== over.id) {
                setTierOrder((prev) => {
                    const activeIndex = prev.indexOf(active.id);
                    const overIndex = prev.indexOf(over.id);
                    return arrayMove(prev, activeIndex, overIndex);
                });
            }
            setActiveId(null);
            setActiveType(null);
            return;
        }

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
        setActiveType(null);
    }
    // End of AI-Assisted code

    function dragOverlayLogic() {
        if (!activeId) return null;

        if (activeType === "Item") {
            return (<DraggableItem id={activeId} imageUrl={itemsData[activeId]} isOverlay={true} /> );
        } 

        if (activeType === "Tier") {
            return ( <Tier key={activeId} id={activeId} items={tiers[activeId]} tierData={tiersData[activeId]} imgUrlLookup={itemsData} isOverlay={true} /> )            
        }        
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function deleteItem(itemId) {
    setTiers((prev) => {
        const updated = {};

        for (const tierId in prev) {
            updated[tierId] = prev[tierId].filter((id) => id !== itemId);
        }

        return updated;
    });

    setItemsData((prev) => {
        const { [itemId]: removed, ...remaining } = prev;
        return remaining;
    });
}

    function handleUpload(imageUrl, fileName= "") {
         const newItemId = crypto.randomUUID();

        setTiers((prev) => ({
            ...prev,
            "0": [...prev["0"], newItemId]
        }));

         setItemsData((prev) => ({
        ...prev,
        [newItemId]: {
            id: newItemId,
            imageUrl,
            label: fileName || newItemId
        }
    }));

        
    }

    function updateItemLabel(id, newLabel) {
    setItemsData(prev => {
        if (!prev[id]) return prev;

        return {
            ...prev,
            [id]: {
                ...prev[id],
                label: newLabel
            }
        };
    });
}

    function addNewTier() {
        let newTierId = tierCount + 1;
        setTierCount((prev) => prev+1);

        setTierOrder((prev) => {
            return [...prev, newTierId.toString()];
        });

        setTiers((prev) => ({
            ...prev,
            [newTierId.toString()]: []
        }));

        setTiersData((prev) => ({
            ...prev,
            [newTierId.toString()]: {
                title: newTierId,
                labelColor: "#87877f"
            }
        }));
    }

    function removeTier(id) {
        console.log("Remove Tier Triggered. Id: ", id);
        console.log("Current TierOrder:", tierOrder);
        console.log("Current Tiers:", tiers);

        if (Array.isArray(tiers[id])) {
            console.log("Removing Tier: " + id);
            
            console.log("Moving items in array to UnrankedContainer")
            setTiers((prevTiers) => {
                const removedTierItems= prevTiers[id] || [];

                const { [id]: removedTier, ...remainingTiers } = prevTiers;

                return {
                    ...remainingTiers,
                    "0": [...remainingTiers["0"], ...removedTierItems]
                };

            });
            setTierOrder((prev) => prev.filter((tierId) => tierId !== id));
        }
    }

    function handleLoadTierlist(e) {
        let file = e.target.files[0];
        if (!file) return;
        loadTierListFromJSONFIle(file, setName, setTiers, setTierOrder, setTiersData, setItemsData, setTierCount);
    }
}

