import Tier from "../components/Tier.jsx"; 
export default function TierlistContainer(props) {

    const tiers = props.tiers;
    return (
        <div className="tiers-container">
            <h2>Tierlist Container</h2>
            {props.children}
        </div>
    );
}