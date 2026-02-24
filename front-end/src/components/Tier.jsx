import {useState} from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";
import {CSS} from "@dnd-kit/utilities";

export default function Tier(props) {
    const items = props.items;
    const [title, setTitle] = useState(props.title);
    const [lableColor, setLableColor] = useState();
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ 
        id: props.id,
        data: { type: "Tier" }
    });

    const style = {
        transform: props.isOverlay ? undefined : CSS.Translate.toString(transform),
        transition: props.isOverlay ? undefined : transition,
        opacity: isDragging ? 0.3 : 1, 
        width: props.isOverlay && props.overlayWidth ? props.overlayWidth : undefined,
    };

    const tierlableStyle  ={
        backgroundColor: lableColor 
    }

    const dragHandleSyle = {
        cursor: props.isOverlay ? "grabbing" : "grab"
    }

    return (        
        <div ref={props.isOverlay ? undefined : setNodeRef} className="tier rounded-container" style={style}>
            <div className="tier-label rounded-container" style={tierlableStyle}>
                <input name={props.id + "-label"} className="tier-input" type="text" value={title} onChange={(prev) => {setTitle(prev.target.value)}}/>
            </div>
            <SortableContext items={items}>
                <div  className="tier-middle">
                    {items.map((id) => {
                        return (
                            <DraggableItem key={id} id={id} imageUrl={props.imgUrlLookup[id]}/>
                        )
                    })}
                </div>
            </SortableContext>
            <div className="tier-settings rounded-container">
                Settings ⚙️
                <input type="color" value={lableColor} onChange={(prev) => setLableColor(prev.target.value)} />
              
            </div>
            <div className="drag-handle rounded-container" style={dragHandleSyle} {...attributes} {...listeners}>
                <img alt="drag handle" src={"/images/drag-handle.png"} draggable="false" />
            </div>            
        </div>
    );
}