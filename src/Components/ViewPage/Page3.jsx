import { useLoaderData, useParams } from "react-router-dom";


const Page3 = () => {

    const data = useLoaderData()
    console.log(data)

    const { name } = useParams()
    console.log(name)

    return (
        <div>
            <h1 className="text-center font-bold text-xl">{name.charAt(0).toUpperCase() + name.slice(1)} Cost</h1>
        </div>
    );
};

export default Page3;