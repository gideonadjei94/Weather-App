const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    //destructure method in JS
    const {cityDets , weather} = data ;

    //update details template
    details.innerHTML = `
         <h5 class="my-3">${cityDets.EnglishName}</h5>
         <div class="my-3">${weather.WeatherText}</div>
         <div class="display-4 my-4">
             <span>${weather.Temperature.Metric.Value}</span>
             <span>&deg;C</span>
         </div>  
    `;
    //update the  image and icon images
    const weatherIcon = `icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src' , weatherIcon);


   
    let timeOfDay = null;
    if(weather.IsDayTime === true){
        timeOfDay = 'images/day.jpg';
    }else{
        timeOfDay = 'images/night.jpg'
    }
     time.setAttribute('src' , timeOfDay);

    //remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};


const updateCity = async(city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return{ cityDets , weather  };
       
}       
   


cityForm.addEventListener('submit' , e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    localStorage.setItem('city' , city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err =>console.log(err))
}
