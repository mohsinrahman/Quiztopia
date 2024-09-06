import React , { useState }from 'react'
import { useEffect } from 'react';
import leaflet from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css";


export default function AddQA() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(''); 
    const mapOptions = {
        center: [57.708870, 11.974560],
        zoom: 13,
        maxZoom: 18,
        minZoom: 5,
      };

    

   const handleShowClick = () => {
        
    console.log("kilcked");
      } 

    // när vi loggar in ska vi få tillbaka en token
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { name:"xx", question:question, answer:answer, location: {
            longitude: "xxx",
            latitude: "xxx"
        } };
        console.log('here we are');
        const API_URL = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question";
        try {
            console.log(userData);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Något gick snett med POST-förfrågan vi gjorde :(((')
            }
            const data = await response.json();
            console.log(data);
            sessionStorage.setItem('token', data.token);
        } catch (error) {
            console.error(error);
        }
    }

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        alert(`Clicked at: ${lat}, ${lng}`);
        return (lat, lng);
      };
      const MapEventsHandler = ({ handleMapClick }) => {
        useMapEvents({
          click: (e) => handleMapClick(e),
        });
        return null;
      };

    return (
        <div>
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
        <div>MAP</div>
        <MapContainer {...mapOptions} style={{ height: '500px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEventsHandler handleMapClick={handleMapClick} />
    {/*    <Marker position={[lat, lng]}>
        <Popup>
          A popup message on the marker.
        </Popup>
      </Marker>  */}
    </MapContainer>

       
        </div>
    )
}

