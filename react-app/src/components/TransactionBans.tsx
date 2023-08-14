import {useEffect} from "react";
import axios from "../api/Axios.tsx";
import useTokenStore from "./UseTokenStore.tsx";

interface Props {
    onTransactionBansDataFetched : (data: any) => void;
    handleButtonClicked : boolean;
}



function TransactionBans({onTransactionBansDataFetched,handleButtonClicked} : Props) {

    const token = useTokenStore(state => state.getToken);


    useEffect(() => {
        if(handleButtonClicked)
            fetchDataToDatabase()
    }, [handleButtonClicked]);


    useEffect(() => {
        if(handleButtonClicked)
            fetchDataFromDatabase()
    }, [handleButtonClicked,onTransactionBansDataFetched]);


    const fetchDataToDatabase = () => {
        axios.get("/api/registry/save-to-database", {
            headers : { 'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        withCredentials: false
            }
        }
        )
            .then( (response) => {
                return response.statusText;
            })
            .then( (data) => {
                if(data === "SUCCESS")
                    console.log("DATA SAVED")
                else
                    console.log("FAILED")
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }


    const fetchDataFromDatabase = () => {
        console.log(token)
        axios.get("/api/registry/all-bans-dto", {
            headers : { 'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        withCredentials: false
            }
        })
            .then( (response) => {
                if(response.status === 200) {
                    onTransactionBansDataFetched(response.data)
                }
                else {
                    console.error("Network response was not ok.")
                }
            })
            .catch( (error) => {
                console.error("Error fetching data: ", error)
                if(error.response) {
                    console.error("Response status:", error.response.status)
                    console.error("Response message: ",error.response.statusText)
                }
            })
    }

}


export default TransactionBans