import { useDraggable } from "@dnd-kit/core";

export default  function DraggableItem(props) {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id : props.id
    });

    return (
        <div className="draggable-item" ref={setNodeRef} {...listeners} {...attributes}>
            <span>{props.id}</span>
        </div>
    );
}