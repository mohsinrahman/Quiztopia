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
  
          
            const userData = { message:location.state.quizId }; 
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
            
         console.log(location.state.questions);
        location.state.questions.map((qa,index)=> {
            console.log(qa.location.latitude , qa.location.longitude);  
          const marker = leaflet
            .marker([qa.location.latitude, qa.location.longitude])
            .addTo(map);
          marker.bindPopup(qa.question); 
        })
          map.on('click', (event) => { 
             setCurrentLat(qa.location.latitude);
            setCurrentLng(qa.location.longitude);
            const clat = currentLat;
            const clng = currentLng 
              const marker = leaflet
              .marker([ qa.location.latitude ,qa.location.longitude ])
              .addTo(map);  
              marker.bindPopup(qa.question); 
  /*             var markerLocation = new L.LatLng(qa.location.latitude, qa.location.longitude);
              var marker = new L.Marker(markerLocation);
              map.addLayer(marker);
          
              marker.bindPopup(qa.question); */ 
          }); 
       /*     marker.on('click', () => {
            console.log(location.state.quizId);
          });  */
         
        }
    
      }, [map]); 
  return (
    <div>
    <h1>Map</h1>
    <section id='map'></section>
    </div>
  )
}
