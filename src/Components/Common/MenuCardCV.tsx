import { useState } from "react";
import "./MenuCard.css";

function MenuCardCV() {
  const [flipped, setFlipped] = useState(false);

 return (
    <div className="menucard-scene" onClick={() => setFlipped(!flipped)}>
      <div className={`menucard ${flipped ? "flipped" : ""}`}>
        <div className="menucard-face menucard-front">
          CV
          <img src={`${process.env.PUBLIC_URL}/images/fontsize.svg`} alt="Pizza" />
        </div>

        <div className="menucard-face menucard-back">
          <h3>Ingredients</h3>
          <p>Tomato, Mozzarella, Basil</p>
          <strong>$12.00</strong>
        </div>
      </div>
    </div>
  ); 
}

export default MenuCardCV