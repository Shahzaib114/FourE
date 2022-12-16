import AsyncStorage from '@react-native-async-storage/async-storage';

class SharedPreferences {
    
    //used for saving values
    SaveValueForKey(key,value) {
        AsyncStorage.setItem(key, value);
    }

    //used for fetching values
    GetValueForKey(key, responseCallBack){
        AsyncStorage.getItem(key, (err,result) => {
            if(result == ""){
                result = null;
            }
            responseCallBack(result);
        })
    }

    //Removes the target Key
    RemoveKey(key){
        AsyncStorage.removeItem(key);
    }

    //Removes all the data
    RemoveAll(){
        AsyncStorage.clear();
    }

}

export default SharedPreferences;