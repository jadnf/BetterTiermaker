import React, { useState } from "react";


function AddNewTier({ onAdd }) {
    function handleAdd() {
        if(onAdd){
            onAdd();
        }
    }
    
    return (
        <div>
            <button onClick={handleAdd}>Add New Tier</button>
        </div>
    );
}

export default AddNewTier;