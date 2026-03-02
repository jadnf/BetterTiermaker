import { useState, useEffect  } from "react";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default  function DraggableItem(props) {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id : props.id,
        data : {type : "Item"}
    });
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(props.label);
    useEffect(() => {setLabel(props.label);}, [props.label]);


    const style = {
        transform: props.isOverlay ? undefined : CSS.Translate.toString(transform),
        transition: props.isOverlay ? undefined : transition,
        opacity: isDragging ? 0.3 : 1, 
        cursor: props.isOverlay ? "grabbing" : "grab"
    };

    return (
        <div className="draggable-item" style={style} ref={props.isOverlay ? undefined : setNodeRef} {...listeners} {...attributes}>
             <div {...listeners} {...attributes}>
            <img alt={props.id} src={props.imageUrl}  />
            </div>
            

            <div className="item-label">
                {isEditing ? (
                    <input value={label} onChange={(e) => setLabel(e.target.value)} onBlur={() => props.updateLabel?.(props.id, label)} onKeyDown={(e) => {if (e.key === "Enter"){props.updateLabel?.(props.id,label); setIsEditing(false);}}} onClick={(e) => e.stopPropagation()} autoFocus />
                ) : (
                    <span onClick={(e) => { e.stopPropagation(); setIsEditing(true);}}>{label}</span>
                )}
            </div>
        </div>
    );
}