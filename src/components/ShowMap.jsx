import React ,{useState , useEffect} from 'react'
import { useLocation } from "react-router-dom";
import leaflet, { Map } from 'leaflet';




export default function ShowMap() {
    const [position, setPosition] = useState();
    const [currentLat , setCurrentLat] = useState(0);
    const [currentLng , setCurrentLng] = useState(0);
    const [map, setMap] = useState();
    const location = useLocation();
    console.log(location.state);

          // när vi loggar in ska vi få tillbaka en token
          useEffect(() => {
  
           
            const userData = { name:"quizV", question:"question", answer:answer, location: {
                longitude: currentLng,
                latitude: currentLat
            } };
            console.log('here we are');
            let token = '';
            token = sessionStorage.getItem('token') || '';
            const API_URL = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${location.state.userId}/${location.state.quizId}`;
            try {
                console.log(userData);
                const response = fetch(API_URL, {
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
                const data =  response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        })
    
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
  return (
    <div><section id='map'></section></div>
  )
}
