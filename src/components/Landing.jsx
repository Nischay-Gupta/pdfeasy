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
            {/* Replace these with your screenshot images */}
            <img src="/screenshots/1.png" alt="Screenshot 1" />
            <img src="/screenshots/2.png" alt="Screenshot 2" />
            <img src="/screenshots/3.png" alt="Screenshot 3" />
          </div>
        </div>
      </section>
    );
  };
  
  export default Landing;
  