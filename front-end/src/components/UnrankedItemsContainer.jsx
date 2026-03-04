import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import DraggableItem from "../components/DraggableItem.jsx";

export default  function UnrankedItemsContainer(props) {
    const items = props.items;
    const {setNodeRef} = useDroppable({
        id : props.id
    });

    return (
        <SortableContext id={props.id} items={items} strategy={rectSortingStrategy}>
            <h4>Unranked</h4>
            <div className="unranked-container rounded-container" ref={setNodeRef}>
                {items.map((id) => {
                    return (
                        <DraggableItem key={id} id={id} imageUrl={props.itemsData?.[id]?.imageUrl} />
                    )
                })}
            </div>
        </SortableContext>
    );
}