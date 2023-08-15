import {useEffect} from "react";
import axios, {axiosPrivate} from "../api/Axios.tsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";

interface Props {
    onTransactionBansDataFetched : (data: any) => void;
    handleButtonClicked : boolean;
}



function TransactionBans({onTransactionBansDataFetched,handleButtonClicked} : Props) {

    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        if(handleButtonClicked)
            fetchDataToDatabase()
    }, [handleButtonClicked]);


    useEffect(() => {
        if(handleButtonClicked)
            fetchDataFromDatabase()
    }, [handleButtonClicked,onTransactionBansDataFetched]);


    const fetchDataToDatabase = () => {
        axiosPrivate.get("/api/registry/save-to-database", {

        }
        )
            .then( (response) => {
                if(response.status === 201) {
                    console.log("DATA SAVED")
                }
                else {
                    console.error("FAILED")
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
            })
    }


    const fetchDataFromDatabase = () => {
        axiosPrivate.get("/api/registry/all-bans-dto", {

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