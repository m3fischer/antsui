import Antslayout from '../components/antslayout';
import styles from '../components/antslayout.module.css';

export default function addEntryFuetterung () {
    return ( 
        <Antslayout>
            <h1>Tägliche Futterabfrage</h1>
            <p>Trage hier die tägliche Füterung ein</p>
            

           <form>
                <h2>Was hast du gefüttert</h2>
                <input type="radio" id="vehicle1" name="vehicle1" value="Bike"></input>
                <label for="vehicle1"> I have a bird</label><br/>

                <input type="radio" id="vehicle2" name="vehicle1" value="Car"/>
                <label for="vehicle2"> I have a car</label><br/>
                
                <input type="radio" id="vehicle3" name="vehicle1" value="Boat"/>
                <label for="vehicle3"> I have a boat</label>

                <input type='submit'></input>

                
            </form>


        </Antslayout>
    )
}