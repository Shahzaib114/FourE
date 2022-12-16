import SharedPreferences from '../DataManager/SharedPreferences';
import DataService from '../Services/DataService';

class ClientLayer{
    
    sharedPreferences = null
    dataService = null
    static instance = null

    static createInstance(){
        if(this.instance == null){
            this.instance = new ClientLayer();
        }
    }

    static getInstance(){
        return this.instance
    }

    Initialize(){
        this.dataService = new DataService()
        this.sharedPreferences = new SharedPreferences()
    }

    InitializeWithCallback(successCallBack, errorCallBack) {
        error = this.Initialize();
        // let error;
        if(error == null) {
            successCallBack();
        } else {
            errorCallBack();
        }
    }

    getDataManager(){
        return this.sharedPreferences
    }

    getDataService(){
        return this.dataService
    }
}

export default ClientLayer;