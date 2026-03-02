import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Tier from "../components/Tier.jsx"; 
export default function TierlistContainer(props) {


    const tierOrder = props.tierOrder;
    const tiers = props.tiers;
    const itemsData = props.itemsData;
    const removeTier = props.removeTier;
    const updateItemLabel = props.updateItemLabel;

    return (
        <div className="tiers-container">
            <h2>Tierlist Container</h2>
            <SortableContext items={tierOrder} strategy={verticalListSortingStrategy}>
                {tierOrder.map((tierId) => {
                    
                    return(<Tier key={tierId} id={tierId} items={tiers[tierId]} title={tierId} removeTier={removeTier} itemsData={itemsData} updateItemLabel={updateItemLabel}/>)
                                        
                })}
            </SortableContext>
        </div>
    );
}