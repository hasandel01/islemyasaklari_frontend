import TransactionBans from "./TransactionBans.tsx";
import {useState} from "react";
import useTokenStore from "./UseTokenStore.tsx";

// Define the type for 'data'
type BanData = {
    // Define the type for each property in the 'data' object
    unvan: string;
    mkkSicilNo: string;
    pay: string;
    payKodu: string;
    kurulKararTarihi: string;
    kurulKararNo: string;
};

function DataHandler() {



    const [transactionBans, setTransactionBans] = useState<BanData[]>([]); // Use the 'BanData' type here
    const [buttonClicked, setButtonClicked] = useState(false);
    const [showData, setShowData] = useState(false);
    const [details, setDetails] = useState<boolean[]>([]);


/*
    setDetails(new Array(.length).fill(false));
*/

    const handleTransactionBans = (data: BanData[]) => {
        setTransactionBans(data);
    };

    const handleDetails = (index: number) => {
        setDetails((prevDetails) => {
            const newDetails = [...prevDetails];
            newDetails[index] = !newDetails[index]; // Corrected this line
            return newDetails;
        });
    };


    const handleOnClick = () => {
        setShowData((prevShowData) => !prevShowData); // Toggle showData
        setButtonClicked(true); // Set buttonClicked to true when the button is clicked
    };

    return (
        <div>
            <TransactionBans
                onTransactionBansDataFetched={handleTransactionBans}
                handleButtonClicked={buttonClicked}
            />
            {showData &&
                transactionBans.map((ban,index) => (
                    <div className={"ban-item"} key={index}>
                        <div className={"fancy-list-item"}>
                            <h3
                                className={`ban-title ${details[index] ? "active" : ""}`}
                                onClick={() => handleDetails(index)}
                            >
                                {ban.unvan}
                            </h3>
                            {details[index] && (
                                <div>
                                    <p className={"ban-property"}>MKK SİCİL NO: {ban.mkkSicilNo}</p>
                                    <p className={"ban-property"}>PAY: {ban.pay}</p>
                                    <p className={"ban-property"}>PAY KODU: {ban.payKodu}</p>
                                    <p className={"ban-property"}>KURUL KARAR TARİHİ: {ban.kurulKararTarihi}</p>
                                    <p className={"ban-property"}>KURUL KARAR NO: {ban.kurulKararNo}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            <button className={"button-new"} onClick={handleOnClick}>
                SORGULA
            </button>
        </div>
    );

}

export default DataHandler