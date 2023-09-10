import catalogs from "../../Settings/catalog.json";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Action } from "../../Settings"

export const Catalog = ({catalog}) => {
    const {catalogTime, catalogsArrayNumber, catalogNumber} = useSelector((state) => state.Reducer)
    const dispatch = useDispatch()
    const handleCatalog = () => {
        dispatch(Action.setCatalogTime(true))
    }
    useEffect(() => {
        if(catalog){
            setTimeout(handleCatalog, 300)        
        }
    },[catalog])
    const handleMouse = (id) => {
        dispatch(Action.setCatalogNumber(id))
    }
    useEffect(() => {
        if(catalogs?.length){
            dispatch(Action.setCatalogsNumber(catalogs))
        }
    },[catalogs])
    useEffect(() => {
        console.log(catalogsArrayNumber)
    },[catalogsArrayNumber])
    return(
        <div className="catalog" style={{opacity: catalogTime ? 1: 0}}>
            <div className="catalog-items">
                <ul className="catalog-list">
                    {catalogsArrayNumber?.map((item, index) => {
                        return(
                            <li className="catalog-item" onMouseOver={() => handleMouse(index)}>{item?.title}</li>
                        )
                    })}    
                </ul>
                {catalogsArrayNumber?.length ? (
                    <div className="catalog-route">
                        {[catalogs[catalogNumber]]?.map(item => {
                            return(
                                <>
                                    <div className="catalogRoute-title-box">
                                        <h3 className="catalog-title">{item?.title}</h3>
                                    </div>
                                    {item?.cards &&  (
                                    <div className="catalogRoute-cards">
                                        {item?.cards?.map(item => {
                                            return(
                                               <>
                                               <div className="catalogRoute-card">
                                                <p className="catalogCard-title">{item?.title}</p>
                                                <ul className="catalogCard-list" style={{listStyle: "none"}}>
                                                {item?.texts?.map(item => (
                                                    <li className="catalogCard-item"><p>{item}</p></li> 
                                                ))}
                                                </ul>
                                               </div>
                                               </>
                                            )
                                        })}
                                    </div>
                                    )}
                                </>
                            )
                        })}
                    </div>
                ): null}
            </div>
        </div>
    )
}