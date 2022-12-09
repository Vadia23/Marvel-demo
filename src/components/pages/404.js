
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link, useNavigate, useParams} from "react-router-dom";

const Page404 = () => {
    const navigation = useNavigate();

    const adress = useParams();
    console.log(adress);

    function goBack() {
        navigation(-1);
    }
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist!</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color': 'blue'}} onClick={goBack} >Back to last page</Link>
        </div>
    )
}

export default Page404;