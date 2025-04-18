import { useState } from "react";
import { coffeeOptions } from "../utils/index.js";
import { useAuth } from "../context/AuthContext.jsx";
import { doc, setDoc} from "firebase/firestore";
import { db } from "../../firebase.js";

export default function CoffeeForm({ isAuthenticated }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
    const [coffeeCost, setCoffeeCost] = useState(0);
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const {globalData, setGlobalData, globalUser} = useAuth();
    

    async function handleSubmitForm() {
        if (!isAuthenticated) {
            setShowModal(true);
            return;
        }

        // define a guard clause that only submits if all fields are filled
        if (!isAuthenticated) {
            setShowModal(true);
            return;
        }
        
        // then we are going to create a new data object
        if  (!selectedCoffee) {
            return;
        }
        // update the global state
        const newGlobalData = {
            ...(globalData || {}),
        }

        const nowTime = Date.now();

        const timeToSubtract = (hours * 60 * 60 * 1000) + (mins * 60 * 100)

        const timestamp = nowTime - timeToSubtract;

        const newData = {
            name: selectedCoffee,
            cost: coffeeCost
        }

        newGlobalData[timestamp] = newData;
        console.log(timestamp, selectedCoffee, coffeeCost);

        // update the global state
        setGlobalData(newGlobalData);

        // persist the data in the firebase firestore
        const userRef = doc(db, 'users', globalUser.uid)
        const res = await setDoc(userRef, {
            [timestamp]: newData
        }, { merge: true})
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={() => { setShowModal(false); }}>
                    <Authentication handleCloseModal={() => { setShowModal(false); }} />
                </Modal>
            )}
            <div className="section-header">
                <i className="fa-solid fa-pencil"></i>
                <h2>Start Tracking Today</h2>
            </div>
            <h4>
                Select coffee type
            </h4>
            {/* first 5 coffee options */}
            <div className="coffee-grid">
                {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
                    return (
                        <button onClick={() => {
                            setSelectedCoffee(option.name);
                            setShowCoffeeTypes(false);
                        }} className={"button-card" + (option.name === selectedCoffee ? ' coffee-button-selected' : '')} key={optionIndex}>
                            <h4>{option.name}</h4>
                            <p>{option.caffeine} mg</p>
                        </button>
                    )
                })}
                <button onClick={() => {
                    setShowCoffeeTypes(true)
                    setSelectedCoffee(null);
                }} className={"button-card" + (showCoffeeTypes ? ' coffee-button-selected' : '')}>
                    <h4>Other</h4>
                    <p>n/a</p>
                </button>
            </div>
            {/* dropdown box for other option */}
            {showCoffeeTypes && (
                <select onChange={(e) => {
                    setSelectedCoffee(e.target.value);
                }} name="coffee-list" id="coffee-list">
                    <option value={null}>
                        Select Type
                    </option>
                    {coffeeOptions.map((option, optionIndex) => {
                        return (
                            <option value={option.name} key={optionIndex}>
                                {option.name} ({option.caffeine} mg)
                            </option>
                        )
                    })}
                </select>
            )}
            {/* cost section */}
            <h4>Add the cost ($)</h4>
            <input className="w-full" type="number" placeholder="4.50" min="0" value={coffeeCost} onChange={(event) => {
                setCoffeeCost(event.target.value);
            }} />

            {/* time since consumption */}
            <h4>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    {/* hours since last consumption */}
                    <h6>Hours</h6>
                    <select name="" id="hours-select" onChange={(event) => {
                        setHours(event.target.value);
                    }}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour, hourIndex) => {
                            return (
                                <option value={hour} key={hourIndex}>
                                    {hour}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    {/* mins since last consumption */}
                    <h6>Mins</h6>
                    <select name="" id="mins-select" onChange={(event) => {
                        setMins(event.target.value);
                    }}>
                        {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
                            return (
                                <option value={min} key={minIndex}>
                                    {min}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>

            {/* Add button */}
            <button onClick={handleSubmitForm}>
                <p> Add Entry </p>
            </button>
        </>
    )
}
