import 'leaflet/dist/leaflet.css';
import './CreateQAmap.css';
import leaflet, { Map } from 'leaflet';
import { useState, useEffect,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { QuizContext } from '../App';

function CreateQAmap() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); 
  const [position, setPosition] = useState();
  const [currentLat , setCurrentLat] = useState(0);
  const [currentLng , setCurrentLng] = useState(0);
  const [map, setMap] = useState();
  const navigate = useNavigate();

  const quizV = useContext(QuizContext);
  const handleShowClick = () => {
        
    console.log("kilcked");
      } 
      
      // när vi loggar in ska vi få tillbaka en token
      const handleSubmit = async (event) => {
        event.preventDefault();
       
        const userData = { name:quizV, question:question, answer:answer, location: {
            longitude: currentLng,
            latitude: currentLat
        } };
        console.log('here we are');
        let token = '';
        token = sessionStorage.getItem('token') || '';
        const API_URL = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question";
        try {
            console.log(userData);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}`: '',
                },
                body: JSON.stringify(userData)
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Något gick snett med POST-förfrågan vi gjorde :(((')
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

  function getPosition() {
    if ('geolocation' in navigator && !position?.latitude) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition(position.coords);
      });
    }
  }

  useEffect(() => {
    if (!position?.latitude) {
      getPosition();
    }
  }, []);

  useEffect(() => {
    if (position?.latitude && !map) {
      const myMap = leaflet
        .map('map')
        .setView([position?.latitude, position?.longitude], 15);

      setMap(myMap);
    }
  }, [position]);

  useEffect(() => {
    if (map && position) {
      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);

      const marker = leaflet
        .marker([position?.latitude, position?.longitude])
        .addTo(map);

      marker.bindPopup('Detta är Jensen YH');

      map.on('click', (event) => {
        console.log(event);
        console.log(event.latlng.lat);
        console.log(event.latlng.lng);
        setCurrentLat(event.latlng.lat);
        setCurrentLng(event.latlng.lng);
        const clat = currentLat;
        const clng = currentLng
        const marker = leaflet
          .marker([ event.latlng.lat ,event.latlng.lng ])
          .addTo(map);
          console.log(marker._latlng.lat)
      });
      console.log(marker._latlng.lat)
      marker.on('click', () => {
        console.log('Du klickade på Jensen YH');
      });
    }
  }, [map]);

  return <>
  <button type="submit" onClick={()=> navigate('/showallquiz')}>Show all quiz</button>
  <h1>Add Details</h1>
         <article>
            <form onSubmit={handleSubmit}>
                <div className="m-2">
                <label>
                    Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => { setQuestion(e.target.value) }}
                    ></input>
                </div>
                <div className="m-2">
                <label>
                    Answer:
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => { setAnswer(e.target.value) }}
                    ></input>
                </label>
                </div>
                { <button onClick={handleShowClick} type="submit">Add</button> }
                
          
            </form>
      
        </article>
  <h1>Map</h1>
  <section id='map'></section>
  </>
}

export default CreateQAmap;
