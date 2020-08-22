const SERVER_URL = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return "http://localhost:8000";
    } else {
        return "https://api.demo.shulesuite.com";
    }
};

export default SERVER_URL;

export const URL = SERVER_URL();
