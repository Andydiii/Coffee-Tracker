import { coffeeConsumptionHistory, calculateCurrentCaffeineLevel, timeSinceConsumption, getCaffeineAmount } from "../utils";

export default function History() {
    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-timeline" />
                <h2>History</h2>
            </div>
            <p>
                <i>Hover for more infomation!</i>
            </p>
            <div className="coffee-history">
                {/* Object.keys turn the object keys into an array, and sort it in descending order, e.g. 2025, 2024, 2023, etc. */}
                {Object.keys(coffeeConsumptionHistory).sort((a, b) => {
                    return (b - a);
                }).map((utcTime, utcTimeIndex) => {
                    const coffeeConsumption = coffeeConsumptionHistory[utcTime]; // e.g. {name: "Latte", cost: 5}
                    const timeSinceConsume = timeSinceConsumption(utcTime); // e.g. 4 days, 2 hrs ago, 2mins, 3 secs ago.
                    const originalAmount = getCaffeineAmount(coffeeConsumption.name);
                    const remainingAmount = calculateCurrentCaffeineLevel({
                        [utcTime]: coffeeConsumption // [utcTime] is treated as the variable. e.g. if utcTime is 2025-04-04, then the object is {2025-04-04: {name: "Latte", amount: 5}}
                    }); // get current caffeine level of the user after that coffee consumption.

                    const summary = `${coffeeConsumption.name} | ${timeSinceConsume} | $${coffeeConsumption.cost} |  ${remainingAmount}mg / ${originalAmount}mg `;

                    return (
                        <div title={summary} key={utcTimeIndex}>
                            <i className="fa-solid fa-mug-hot"></i>
                        </div>
                    )
                })}
            </div>
        </>
    )
}