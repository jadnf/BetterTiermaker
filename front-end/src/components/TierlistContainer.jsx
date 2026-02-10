export default function TierlistContainer(props) {

    return (
        <div className="tiers-container">
            <h2>Tierlist Container</h2>
            {props.children}
        </div>
    );
}