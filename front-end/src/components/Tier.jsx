import { useDroppable } from "@dnd-kit/core";

export default function Tier(props) {
    const {setNodeRef} = useDroppable({
        id : props.id
    });

    return (
        <div>
            <span className="tier-label">
                {props.label}
            </span>
            <span ref={setNodeRef} className="tier-middle">

            </span>
            <span className="tier-settings">
                Settings ⚙️
            </span>
        </div>
    );
}