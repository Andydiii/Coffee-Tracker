import { calculateCurrentCaffeineLevel, coffeeConsumptionHistory, statusLevels, calculateCoffeeStats, getTopThreeCoffees } from "../utils"

function StatCard({ lg, title, children}) {

    return (
        // if lg is true, the card spans 2 columns, i.e. the whole row.
        <div className={'card stat-card ' + (lg ? 'col-span-2' : '')}>
            <h4>{title}</h4>
            {children}
        </div>
    )
}
 


export default function Stats() {
    const {daily_caffeine, daily_cost, average_coffees, total_cost} = calculateCoffeeStats(coffeeConsumptionHistory)
    // caffeine level is always 0 because based
    const caffeineLevel = calculateCurrentCaffeineLevel(coffeeConsumptionHistory)
    const warningLevel = caffeineLevel < statusLevels.low.maxLevel ? 'low' 
    : caffeineLevel < statusLevels.moderate.maxLevel ? 'moderate'
    : 'high'

    
    return (
        <>  
            {/* some important stats of the user */}
            <div className="section-header">
                <i className="fa-solid fa-chart-simple" />
                <h2>Stats</h2>
            </div>
            <div className="stats-grid">
                {/* just leave only lg there means lg = {true} */}
                <StatCard lg title="Active Caffeine Level">
                    <div className="status">
                        <p>
                            <span className="stat-text">
                                {caffeineLevel} 
                            </span> mg
                        </p>
                        <h5 style={{color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background}}>Low</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>
                {/* daily caffeine */}
                <StatCard title="Daily Caffeine">
                    <p>
                        <span className="stat-text">
                            {daily_caffeine}
                        </span> mg
                    </p>
                </StatCard>
                {/* avg # of Coffees */}
                <StatCard title="Avg # of Coffees">
                    <p>
                        <span className="stat-text">
                            {average_coffees}
                        </span>
                    </p>
                </StatCard>
                {/* daily cost */}
                <StatCard title="Daily Cost ($)">
                    <p> $ 
                        <span className="stat-text">
                            {daily_cost}
                        </span> 
                    </p>
                </StatCard>
                {/* total cost */}
                <StatCard title="Total Cost ($)">
                    <p> $ 
                        <span className="stat-text">
                            {total_cost}
                        </span> 
                    </p>
                </StatCard>
                {/* table for top 3 coffees */}
                <table className="stat-table">
                    <thead>
                        <tr>
                            <th>Coffee Name</th>
                            <th>Number of Purchase</th>
                            <th>Percentage of Total Consumption</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(coffeeConsumptionHistory).map((coffee, coffeeIndex) => {
                            return (
                                <tr key={coffeeIndex}>
                                    <td>{coffee.coffeeName}</td>
                                    <td>{coffee.count}</td>
                                    <td>{coffee.percentage}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </> 
    )
}