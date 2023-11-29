import DatePicker, { DateObject } from 'react-multi-date-picker';

function Calendar(){
        return(
        <div id = "innerContainer">
            <div className = "inputHeader"> Dates </div>
            <DatePicker 
                inputClass="date-input"
                value={value} 
                onChange={setValue}
                range/>
        </div>
    )
}

export default Calendar;