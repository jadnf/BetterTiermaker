import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable"
import DraggableItem from "../components/DraggableItem.jsx";

export default  function UnrankedItemsContainer(props) {
    const items = props.items;
    const {setNodeRef} = useDroppable({
        id : props.id
    });

    return (
        <div>
            <SortableContext items={items}>
                <h3>Unranked Container</h3>
                <div ref={setNodeRef}>
                    {items.size === 0 ? "Drop here" : ""}
                    {items.map((id) => {
                        return (
                            <DraggableItem key={id} id={id} />
                        )
                    })}
                </div>
            </SortableContext>
        </div>
    );
}