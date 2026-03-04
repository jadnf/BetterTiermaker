import { SortableContext, useSortable } from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";
import {CSS} from "@dnd-kit/utilities";

export default function Tier(props) {
    const id = props.id;
    const items = props.items;
    const tierData = props.tierData;
    const title = tierData.title;
    const labelColor = tierData.labelColor;
    const handleTitleChange = props.handleTitleChange;
    const handleLabelColorChange = props.handleLabelColorChange;

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ 
        id: id,
        data: { type: "Tier" }
    });

    const style = {
        transform: props.isOverlay ? undefined : CSS.Translate.toString(transform),
        transition: props.isOverlay ? undefined : transition,
        opacity: isDragging ? 0.3 : 1, 
        width: props.isOverlay && props.overlayWidth ? props.overlayWidth : undefined,
    };

    const tierlableStyle = {
        backgroundColor: labelColor 
    }

    const dragHandleSyle = {
        cursor: props.isOverlay ? "grabbing" : "grab"
    }

    return (        
        <div ref={props.isOverlay ? undefined : setNodeRef} className="tier rounded-container" style={style}>
            <div className="tier-label rounded-container" style={tierlableStyle}>
                <input name={id + "-label"} className="tier-input" type="text" value={title} onChange={(prev) => {handleTitleChange(id, prev.target.value)}}/>
            </div>
            <SortableContext items={items}>
                <div  className="tier-middle">
                    {items.map((id) => {
                        return (
                            <DraggableItem key={id} id={id} imageUrl={props.itemsData?.[id]?.imageUrl} label={props.itemsData?.[id]?.label} updateLabel={props.updateItemLabel} deleteItem={props.deleteItem} />
                        )
                    })}
                </div>
            </SortableContext>
            <div className="tier-settings rounded-container">
                Settings ⚙️
                <input type="color" value={labelColor} onChange={(prev) => handleLabelColorChange(id, prev.target.value)} />
              
            </div>
            <div className="remove-tier-div">
                <button className="remove-tier-button" onClick={() => props.removeTier(id)}>X</button>
            </div>
            <div className="drag-handle rounded-container" style={dragHandleSyle} {...attributes} {...listeners}>
                <img alt="drag handle" src={"/images/drag-handle.png"} draggable="false" />
            </div>            
        </div>
    );
}