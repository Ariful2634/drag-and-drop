import { useLoaderData, useParams } from "react-router-dom";


const Page2 = () => {

    const data = useLoaderData()
    console.log(data)

    const { name } = useParams()
    console.log(name)

    return (
        <div>
            <h2>{name}</h2>
        </div>
    );
};

export default Page2;