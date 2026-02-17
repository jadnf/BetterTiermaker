import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import DraggableItem from "../components/DraggableItem.jsx";

export default  function UnrankedItemsContainer(props) {
    const items = props.items;
    const {setNodeRef} = useDroppable({
        id : props.id
    });

    return (
        <div>
            <SortableContext id={props.id} items={items} strategy={rectSortingStrategy}>
                <h3>Unranked Container</h3>
                <div className="unranked-container rounded-container" ref={setNodeRef}>
                    {items.map((id) => {
                        return (
                            <DraggableItem key={id} id={id} imageUrl={props.imgUrlLookup[id]} />
                        )
                    })}
                </div>
            </SortableContext>
        </div>
    );
}