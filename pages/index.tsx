import type { NextPage } from 'next';
import InfoText from "../components/home/InfoText";



/**
 * Home page
 *
 * @constructor
 */
const Home: NextPage = () => {


  return (
    <div className="container home-container">
      <div className="row">
        <div className="col-md-12">
          <InfoText />
        </div>
      </div>
    </div>
  )
}

export default Home;
