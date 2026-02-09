import { useDraggable } from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";

export default  function DraggableItem(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id : props.id
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div className="draggable-item" style={style} ref={setNodeRef} {...listeners} {...attributes}>
            <span>{props.id}</span>
        </div>
    );
}