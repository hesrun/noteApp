import {Outlet} from "react-router";

const IndexLayout = () => {
    return (
        <div className="min-h-dvh flex bg-[url('/bg.jpg')] bg-cover bg-center dark:bg-none transition">
            <Outlet/>
        </div>
    );
};

export default IndexLayout;
