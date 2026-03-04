import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Tier from "../components/Tier.jsx"; 
export default function TierlistContainer(props) {

    const name = props.name;
    const tierOrder = props.tierOrder;
    const tiers = props.tiers;
    const itemsData = props.itemsData;
    const removeTier = props.removeTier;
    const updateItemLabel = props.updateItemLabel;
    const tiersData = props.tiersData;
    const setTiersData = props.setTiersData;



    const  handleTitleChange = (tierId, newTitle) => {
        setTiersData((prev) => {
            return {
                ...prev,
                [tierId]: {
                    title : newTitle,
                    labelColor: prev[tierId].labelColor
                }
            };
        })
    }

    const handleLabelColorChange = (tierId, newColor) => {
        setTiersData((prev) => {
            return {
                ...prev,
                [tierId]: {
                    title : prev[tierId].title,
                    labelColor: newColor
                }
            };
        })
    }

    return (
        <div className="tiers-container">
            <input type="text" value={name} onChange={props.handleNameChange} className="tierlist-name-input"/>
            <div>
                <SortableContext items={tierOrder} strategy={verticalListSortingStrategy}>
                    {tierOrder.map((tierId) => {
                        return(<Tier key={tierId} id={tierId} items={tiers[tierId]} removeTier={removeTier} tierData={tiersData[tierId]} handleTitleChange={handleTitleChange} handleLabelColorChange={handleLabelColorChange} itemsData={itemsData} updateItemLabel={updateItemLabel}/>)
                                        
                    })}
                </SortableContext>
            </div>
            
        </div>
    );
}