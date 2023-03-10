import { View, Text, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const LocationPermission = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [value, setValue] = useState(false);

  useEffect(() => {
    return () => stopLocationUpdates(); // 컴포넌트가 언마운트될 때 위치 업데이트 중지
  }, []);

  const startLocationUpdates = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const newIntervalId = setInterval(async () => {
        let newLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        console.log('New Location:', newLocation.coords.latitude, newLocation.coords.longitude);
        setLocation(newLocation);
      }, 1000);

      setIntervalId(newIntervalId);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const stopLocationUpdates = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const toggleLocationUpdates = () => {
		if (intervalId) {
			stopLocationUpdates();
			setIntervalId(null);
			setValue(false);
		} else {
			startLocationUpdates();
		}
	};
	


  return (
    <View className="relative">
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleLocationUpdates}
        value={value}
      />
    </View>
  );
}

export default LocationPermission;
