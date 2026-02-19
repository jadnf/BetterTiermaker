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
            <div className="tier rounded-container">
                <div className="tier-label rounded-container">
                    {props.label}
                    <input className="tier-input" type="text" value={props.title}/>
                </div>
                <div ref={setNodeRef} className="tier-middle">
                    {items.size === 0 ? "Drop here" : ""}
                    {items.map((id) => {
                        return (
                            <DraggableItem key={id} id={id} />
                        )
                    })}
                </div>
                <div className="tier-settings rounded-container">
                    Settings ⚙️
                </div>
            </div>
        </SortableContext>
    );
}