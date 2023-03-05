import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import RootNavigator from './navigator/RootNavigator';
import { NativeBaseProvider } from 'native-base';


export default function App() {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Provider store={store}>
					<RootNavigator />
				</Provider>
			</NavigationContainer>
		</NativeBaseProvider>

	);
}

