import { Link, useLoaderData, useParams } from "react-router-dom";


const Page1 = () => {

    const data = useLoaderData()
    console.log(data)

    const { name } = useParams()
    console.log(name)

    return (
        <div>
            <Link to={`/page2/${name}`}>
                <div>
                    <h1 className="text-center font-bold text-xl">{name.charAt(0).toUpperCase() + name.slice(1)} Energy</h1>
                </div>
                <button className="btn btn-primary">Link</button>
            </Link>
        </div>
    );
};

export default Page1;