function AddNewTier({ onAdd }) {
    function handleAdd() {
        if(onAdd){
            onAdd();
        }
    }
    
    return (
        <div>
            <button className="add-tier-button" onClick={handleAdd}>Add New Tier</button>
        </div>
    );
}

export default AddNewTier;