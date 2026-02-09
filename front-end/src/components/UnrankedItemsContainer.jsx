import { useDroppable } from "@dnd-kit/core";
import DraggableItem from "./DraggableItem";

export default  function UnrankedItemsContainer(props) {
    const {setNodeRef} = useDroppable({
        id : props.id
    });

    return (
        <div>
            <h3>Unranked Container</h3>
            <div ref={setNodeRef}>
                <DraggableItem id="1"/>
                <DraggableItem id="2"/>
                <DraggableItem id="3"/>
                <DraggableItem id="4"/>
                <DraggableItem id="5"/>
            </div>
        </div>
    );
}