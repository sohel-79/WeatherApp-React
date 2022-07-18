import React, { useEffect, useState } from 'react'

const Temparature = () => {

    const [searchValue , setSearchValue] = useState("Kolhapur");

    const [temperatureInfo , setTemperatureInfo] = useState({});

    const [weatherState , setWeatherState] = useState();

    const getWeatherInfo= async () =>{
        try{
            let url = `
            https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=67bd012bb40e678a64edca7fbb48bb07`;
        
            const res = await fetch(url);
            const data = await res.json();

            const {temp , humidity , pressure}=data.main;
            const{main: weathermood} = data.weather[0]
            const name = data.name;
            const{speed} =data.wind;
            const {country , sunset} = data.sys;
            
            const myNewInfo = {temp , humidity ,pressure, weathermood , name ,speed ,country ,sunset};
      
            setTemperatureInfo(myNewInfo);

            
        }
        catch(error){
            console.log(error)
        }
    }

    

    useEffect(()=> {
        getWeatherInfo();
    },[]);
   
    useEffect(()=>{
        if(temperatureInfo.weathermood){
            switch(temperatureInfo.weathermood){
                case "Clouds" :setWeatherState("wi-day-cloudy");
                break;
                case "Haze" :setWeatherState("wi-fog");
                break;
                case "Rain" : setWeatherState("wi-rain");
                break;
                case "Mist":setWeatherState("wi-dust");
                break;
                case "Clear" :setWeatherState("wi-day-sunny");
                break;

                default:
                    setWeatherState("wi-day-sunny");
            }
        }
    })
    
    let s = temperatureInfo.temp
    let date = new Date(s*1000);
    let timeStr = `${date.getHours()}: ${date.getMinutes()}`;
  

    return (
    <>
        <div className='wrap'>
            <div className='search'>
                <input type="search" 
                placeholder='search...'
                id="search"
                className='searchTerm'
                value={ searchValue }
                onChange={ (e)=>setSearchValue(e.target.value) }/>
                <button className='searchButton' onClick={getWeatherInfo}>Search</button>

            </div>
        </div>

    {/* Temp Card */}
    <article className='widget'>
        <div className='weatherIcon'>
            <i className={`wi ${weatherState}`}></i>
        </div>

        <div className='weatherInfo'>
            <div className='temperature'>
                <span>{temperatureInfo.temp}</span>
            </div>

        <div className='description'>
            <div className='weatherCondition'>

            {temperatureInfo.weathermood}

            </div>
            <div className='place'>
            <span>{temperatureInfo.name}</span>
            <br />
            <span>{temperatureInfo.country}</span>
            </div>
        </div>

        </div>


        <div className='date'>{new Date().toLocaleString()} </div>

        <div className='extra-temp'>
            <div className='temp-info-minmax'>
                <div className='two-sidedisection'>
                    <p><i className={"wi wi-sunset"}></i></p>
                    <p className='extra-info-leftside'>
                    {timeStr} PM
                    <br />
                    Sunset
                    </p>
                </div>


                <div className='two-sidedisection'>
                    <p><i className={"wi wi-humidity"}></i></p>
                    <p className='extra-info-leftside'>
                    {temperatureInfo.humidity}
                    <br />
                    Humidity
                    </p>
                </div>


            </div>

            <div className='weather-extra-info'>
            <div className='two-sidedisection'>
                    <p><i className={"wi wi-rain"}></i></p>
                    <p className='extra-info-leftside'>
                    {temperatureInfo.pressure}
                    <br />
                    Pressure
                    </p>
                </div>


                <div className='two-sidedisection'>
                    <p><i className={"wi wi-strong-wind"}></i></p>
                    <p className='extra-info-leftside'>

                    {temperatureInfo.speed}
                    Speed
                    </p>
                </div>
            </div>


        </div>

    </article>

    </>
  )
}

export default Temparature