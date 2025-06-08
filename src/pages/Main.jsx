import { Button } from 'antd';
import { Link } from 'react-router';

const Main = () => {
    return (
        <>
            <div className="m-auto flex flex-col justify-center items-center max-w-200 text-center gap-y-8 px-4">
                <h1 className="text-3xl md:text-4xl xl:text-6xl">
                    Instant Notes — Always Within Reach
                </h1>
                <p>
                    Create, edit, and organize your thoughts all in one place.
                    Our note-taking app helps you capture ideas quickly, easily,
                    and securely — no clutter, just you and your thoughts.
                </p>
                <Button
                    color="pink"
                    variant="solid"
                    size="large"
                    className="w-40 uppercase"
                >
                    <Link to="/signup">Try to add</Link>
                </Button>
            </div>
        </>
    );
};

export default Main;
