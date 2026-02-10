import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable"
import DraggableItem from "./DraggableItem";

export default function Tier(props) {
    const items = props.items;
    const {setNodeRef} = useDroppable({
        id : props.id
    });

    return (
        <SortableContext items={items}>
            <span className="tier-label">
                {props.label}
            </span>
            <span ref={setNodeRef} className="tier-middle">
                {items.size === 0 ? "Drop here" : ""}
                {items.map((id) => {
                    return (
                        <DraggableItem key={id} id={id} />
                    )
                })}
            </span>
            <span className="tier-settings">
                Settings ⚙️
            </span>
        </SortableContext>
    );
}