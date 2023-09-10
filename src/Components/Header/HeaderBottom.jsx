import Catalog from "../../Settings/assets/images/catalog.svg";
import Close from "../../Settings/assets/images/close.svg";
import { NavLink } from "react-router-dom";
import { Action, Button } from "../../Settings";
import { useDispatch, useSelector } from "react-redux";
import { Catalog as CatalogComponent } from "./Catalog";
import { useEffect } from "react";
export const HeaderBottom = () => {
  const { catalog } = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!catalog){
        dispatch(Action.setCatalogTime(false))
    }
  }, [catalog])
  return (
    <>
      <div className="headerBottom">
        <div className="container">
          <div className="headerBottom-items">
            <div className="headerBottom-btns">
              <Button className="catalot_btn"
                onClick={() => dispatch(Action.setCatalog(!catalog))}
                style={{
                  backgroundImage: `url(${!catalog ? Catalog : Close})`,
                }}
                type="yellow"
              >
                Каталог
              </Button>
              <Button type="black">SARIQ HAFTA</Button>
            </div>
            <nav className="headerBottom-nav">
              <ul className="headerBottom-list">
                <li className="headerBottom-item">
                  <NavLink className="headerBottom-link">Aкциялар</NavLink>
                </li>
                <li className="headerBottom-item">
                  <NavLink NavLink className="headerBottom-link">
                    Хаво совутгичлар
                  </NavLink>
                </li>
                <li className="headerBottom-item">
                  <NavLink className="headerBottom-link">Смартфонлар</NavLink>
                </li>
                <li className="headerBottom-item">
                  <NavLink className="headerBottom-link">МУЗЛАТГИЧЛАР</NavLink>
                </li>
                <li className="headerBottom-item">
                  <NavLink className="headerBottom-link">ЧАНГЮТКИЧЛАР</NavLink>
                </li>
                <li className="headerBottom-item">
                  <NavLink className="headerBottom-link">Ноутбуклар</NavLink>
                </li>
                <li className="headerBottom-item">
                  <NavLink className="headerBottom-link">
                    Barcha ketegoriyalar
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
      <div className="headerBottom-catalog">
        {catalog ? (
            
            <CatalogComponent catalog={catalog} />
        ) : null}
      </div>
        </div>
      </div>
    </>
  );
};
