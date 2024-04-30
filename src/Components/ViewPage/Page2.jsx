import { Link, useLoaderData, useParams } from "react-router-dom";


const Page2 = () => {

    const data = useLoaderData()
    console.log(data)

    const { name } = useParams()
    console.log(name)

    return (
        <div>
              <Link to={`/page3/${name}`}>
                <div>
                    <h1 className="text-center font-bold text-xl">{name.charAt(0).toUpperCase() + name.slice(1)} Power</h1>
                </div>
                <button className="btn btn-primary">Link</button>
            </Link>
        </div>
    );
};

export default Page2;