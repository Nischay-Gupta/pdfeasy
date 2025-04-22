import pdfeasy1 from "../assets/pdfeasy1.png";
import pdfeasy2 from "../assets/pdfeasy2.png";
import pdfeasy3 from "../assets/pdfeasy3.png";


const Landing = ({ onUnlockClick }) => {
    return (
      <section className="landing">
        <div className="text">
          <h2>All-in-one PDF toolkit</h2>
          <p>Merge, split, compress, and edit PDFs with ease — powerful, private, and just $1.</p>
          <div className="buttons">
            <a href="https://your-marketplace-link.com" className="btn">Get it for $1</a>
            <button className="btn outline" onClick={onUnlockClick}>Already bought? Edit PDF now</button>
          </div>
        </div>
        <div className="slider">
          <div className="slide-track">
            <img src={pdfeasy1}/>
            <img src={pdfeasy2}/>
            <img src={pdfeasy3}/>
          </div>
        </div>
      </section>
    );
  };

  export default Landing;
  