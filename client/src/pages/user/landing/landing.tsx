// Imports
import "./_styles.scss";

// Components
import Header from "../../../components/common/header/header";

const Landing = () => {
  return (
    <div className="landing">
      <main>
        <Header />

        <div className="content">
          <div className="info">
            <h1>Make Your Interior More Minimalistic & Modern</h1>
            <p>
              Turn your room with panto into a lot more minimalist and modern
              with ease and speed
            </p>
          </div>
          <div className="sofa"></div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
