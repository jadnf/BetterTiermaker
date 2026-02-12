import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default  function DraggableItem(props) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id : props.id
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    };

    return (
        <div className="draggable-item" style={style} ref={setNodeRef} {...listeners} {...attributes}>
            
            <img alt={props.id} src={props.imageUrl}></img>
        </div>
    );
}