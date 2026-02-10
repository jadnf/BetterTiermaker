import { useDroppable } from "@dnd-kit/core";

export default  function UnrankedItemsContainer(props) {
    const {setNodeRef} = useDroppable({
        id : props.id
    });

    return (
        <div>
            <h3>Unranked Container</h3>
            <div ref={setNodeRef}>
                {props.children}
            </div>
        </div>
    );
}