import useAuth from "./useAuth.tsx";
import axios from "../api/Axios.tsx";


const useRefreshToken = () => {

    // @ts-ignore
    const { setAuth } = useAuth();

            const refresh = async () => {

                const response = await axios.get("/api/v1/auth/refresh-token",
                    {
                        headers : {
                            'Content-Type': 'application/json',
                            withCredentials: false
                        }
                    })
                // @ts-ignore
                setAuth(prev => {
                    console.log(JSON.stringify(prev))
                    console.log(response.data.accessToken)
                    return { ...prev, accessToken: response.data.accessToken}
                })

            }

            return refresh
}

export default useRefreshToken