import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { getStudentAnalytics } from "../actions/students/analytics/students";

function useStudentAnalyticsGeneral() {
    const dispatch = useDispatch();
    const [time, setTime] = useState(null);

    useEffect(() => {
        const today = new Date();

        if (!(today.getMinutes() - time < 1)) {
            dispatch(getStudentAnalytics());
            setTime(today.getMinutes());
        } else {
            console.log("pass");
        }
    }, []);
}

export default useStudentAnalyticsGeneral;
