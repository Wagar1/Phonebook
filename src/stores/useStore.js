import create from 'zustand';
import {devtools} from 'zustand/middleware';

const handleChangeGetStateData = async (set, get) => {
    try{
        const ticket = get().ticket;
        const myHeaders = new Headers();
        myHeaders.append('OTCSTicket', ticket);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        const response = await fetch(
            window.mainUrl +
                `/api/v1/nodes/1356526/output?format=json`,
            requestOptions
        );
        const json = await response.json();
        const data = JSON.parse(json.data);
        data.pop();
        set({
            stateData: data
        });
        return data;
    }catch(error){
        console.error(error);
    }  
}

const store = (set, get) => ({
    ticket: window.ticket,
    stateData: [],
    getStateData: async () => await handleChangeGetStateData(set, get)
});

const useStore = create(devtools(store));

export default useStore;