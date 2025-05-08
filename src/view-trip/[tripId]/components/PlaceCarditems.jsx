import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCarditems({ place }) {
   const [photoUrl, setPhotoUrl] = useState();
  
    useEffect(() => {
      if (place) {
        GetPlacePhoto();
      }
    }, [place]);
  
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: place.placeName
      };
  
      try {
        const result = await GetPlaceDetails(data);
        const photos = result.data.places[0]?.photos;
  
        if (photos && photos.length > 3) {
          const photoName = photos[3].name;
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
          setPhotoUrl(PhotoUrl);
        } else {
          console.error("No sufficient photos found for this hotel.");
        }
      } catch (error) {
        console.error("Error fetching hotel photo:", error);
      }
    };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl}
          alt={place.placeName}
          className="w-[130px] h-[130px] rounded-xl object-cover"
          onError={() => setPhotoUrl('/placeholder.jpg')}
        />

        <div>
          <h2 className="text-black font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400 my-2">{place.placeDetails}</p>
          <h2 className="text-black mt-2 my-2">⏱️ {place.timeTravel}</h2>
          <Button><FaMapLocationDot /></Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCarditems;
