import { GOOGLE_API_KEY } from "../mapKey";

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export const getAddress = async (lat, lng) => {
  url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Something went wrong!');
    const data = await response.json();
    if (!data.results) throw new Error('Something went wrong!');
    return data.results[0].formatted_address;
  } catch (err) {
    throw err;
  }
}