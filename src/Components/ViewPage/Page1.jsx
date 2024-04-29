import { Link, useLoaderData, useParams } from "react-router-dom";


const Page1 = () => {

    const data = useLoaderData()
    console.log(data)

    const { name } = useParams()
    console.log(name)

    return (
        <div>
            <h2>{name}</h2>
            <Link to={`/page2/${name}`}>
                <button className="btn btn-primary">Link</button>
            </Link>
        </div>
    );
};

export default Page1;