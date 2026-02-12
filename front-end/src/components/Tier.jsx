import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";

export default function Tier(props) {
    const items = props.items;
    const {setNodeRef} = useDroppable({
        id : props.id
    });

    return (
        <SortableContext items={items}>
            <div className="tier">
                <div className="tier-label">
                    {props.label}
                </div>
                <div ref={setNodeRef} className="tier-middle">
                    {items.size === 0 ? "Drop here" : ""}
                    {items.map((id) => {
                        return (
                            <DraggableItem key={id} id={id} />
                        )
                    })}
                </div>
                <div className="tier-settings">
                    Settings ⚙️
                </div>
            </div>
        </SortableContext>
    );
}