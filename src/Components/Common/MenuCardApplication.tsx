import { useState } from "react";
import "./MenuCard.css";
import { useNavigate } from "react-router-dom";

export interface MenuItem {
  id: number,
  title: string,
  action: string
  icon: string
  level : number
  parentId : number
}


interface MenuCardApplicationProps {
  menuItems: MenuItem[]
  onChange: (menuPoint: MenuItem) => void;
}


const MenuCardApplication: React.FC<MenuCardApplicationProps> = ({ menuItems, onChange }) => {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  function handleMenuPointSelected(menuId: MenuItem) {
    onChange(menuId);
  }

  return (
    <div className="menucard-scene">
      <div
        className={`menucard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(prev => !prev)}
      >
        {/* FRONT */}
        <div className="menucard-face menucard-front">
          <h2>Ansøgning</h2>
          <img src={`${process.env.PUBLIC_URL}/images/fontsize.svg`} alt="Icon" />
        </div>

        {/* BACK */}
        <div className="menucard-face menucard-back">
          <div className="menucard-grid">
            {menuItems.map((menuItem, index) => (
              <div
                key={menuItem.id}
                className="menucard-row"
                style={{ transitionDelay: `${index * 100}ms` }} // staggered animation
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuPointSelected(menuItem);
                }}
              >
                <span className="icon">{menuItem.icon}</span>
                <span className="title">{menuItem.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCardApplication;
