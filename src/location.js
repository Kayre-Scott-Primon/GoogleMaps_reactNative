// import
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

// GPS turn on
async function checkGPSstatus() {
    await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
    })
        .then((data) => {
            console.log('GPS turned on');
        })
        .catch((err) => {
            console.log('GPS turned off');
        });
}

// permissão localização
async function PermissionLocation() {

    const isGranted = await PermissionsAndroid.requestMultiple(['android.permission.ACCESS_COARSE_LOCATION', 'android.permission.ACCESS_FINE_LOCATION'])

    if (isGranted['android.permission.ACCESS_COARSE_LOCATION'] && isGranted['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
        console.log('granted permission ACCESS_COARSE_LOCATION');
        console.log('granted permission ACCESS_FINE_LOCATION');
        return true
    } else {
        console.log('Denied permission ACCESS_COARSE_LOCATION');
        alert(
            'Permissão de localização negada. Feche o aplicativo e entre novamente para permitir!'
        );
        return false
    }

}

// permissão localização fina
function PermissionFineLocation(version) {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Permissão de uso da localização fina',
        message:
            'Permita que o InField tenha acesso à sua localização fina. Se negar, o uso do aplicativo será afetado!',
        buttonPositive: 'Permitir',
        buttonNegative: 'Negar',
        buttonNeutral: 'Cancelar',
    })
        .then((fine) => {
            if (fine === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('granted permission ACCESS_FINE_LOCATION');
            } else {
                console.log('negaded permission ACCESS_FINE_LOCATION');
                alert(
                    'Permissão de localização fina negada. Feche o aplicativo e entre novamente para permitir!'
                );
            }
        })
        .finally(() => {
            version > 9 && PermissionBackgroundLocation();
        });
}

// permissão localização em segundo plano
async function PermissionBackgroundLocation() {
    const isGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION, {
        title: 'Permissão de uso de localização em segundo plano',
        message:
            'Permita que o InField tenha acesso à sua localização ao todo momento. Se negar, o uso do aplicativo será afetado!',
        buttonPositive: 'Permitir',
        buttonNegative: 'Negar',
        buttonNeutral: 'Cancelar',
    })

    if (isGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted permission ACCESS_BACKGROUND_LOCATION');
        checkGPSstatus();
        return true
    } else {
        console.log('denied permission ACCESS_BACKGROUND_LOCATION');
        checkGPSstatus();
        alert(
            'Permissão de localização em segundo plano negada. Feche o aplicativo e entre novamente para permitir!'
        );
        return false
    }

}

// popUp da permissão
async function popUpPermission() {
    if (Number(String(Platform.constants.Release).split('.')[0]) <= 9) {
        const checkBacgroundPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION)
        if (!checkBacgroundPermission) {
            // await AsyncAlert();
            if (await PermissionLocation()) {
                return true
            }
            else {
                return false
            }
        } else {
            return true
        }
    } else {
        const checkBacgroundPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION)
        if (!checkBacgroundPermission) {
            // await AsyncAlert();
            if (await PermissionLocation()) {
                if (await PermissionBackgroundLocation()) {
                    return true
                } else {
                    return false
                }
            }
            else {
                return false
            }
        } else {
            return true
        }
    }
}
// popUp
const AsyncAlert = async () =>
    new Promise((resolve) => {
        Alert.alert(
            'Permissão de uso de localização em segundo plano',
            'O InField coleta dados de localização para habilitar o recurso de salvar o rastro no processo de amostras, mesmo quando o aplicativo está fechado ou não em uso.',
            [
                {
                    text: 'Permitir',
                    onPress: () => {
                        resolve('YES');
                    },
                },
                {
                    text: 'Negar',
                    onPress: () => {
                        resolve('NO');
                    },
                },
            ],
            { cancelable: false }
        );
    });

export { checkGPSstatus, PermissionLocation, PermissionFineLocation, popUpPermission, AsyncAlert };
