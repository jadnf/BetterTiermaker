import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default  function DraggableItem(props) {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id : props.id,
        data : {type : "Item"}
    });

    const style = {
        transform: props.isOverlay ? undefined : CSS.Translate.toString(transform),
        transition: props.isOverlay ? undefined : transition,
        opacity: isDragging ? 0.3 : 1, 
        cursor: props.isOverlay ? "grabbing" : "grab"
    };

    return (
        <div className="draggable-item" style={style} ref={props.isOverlay ? undefined : setNodeRef} {...listeners} {...attributes}>
            
            <img alt={props.id} src={props.imageUrl}></img>
            <div className="item-settings">⚙️</div>
        </div>
    );
}