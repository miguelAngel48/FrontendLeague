import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './../itemDetail.css';

export default function ItemDetail() {
    const { id } = useParams();
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        const fetchItemDetail = async () => {
            try {
                const response = await fetch("https://ddragon.leagueoflegends.com/cdn/14.21.1/data/es_ES/item.json");
                const data = await response.json();
                const infoItem = data.data[id];
                setItemInfo(infoItem);
            } catch (error) {
                console.error("Error al cargar los detalles del objeto", error);
            }
        };
        fetchItemDetail();
    }, [id]);

    if (!itemInfo) return <h2 className="loading-text">Forjando objeto...</h2>;

    return (
        <div className="item-detail-container">
            <Link to="/items" className="back-button">
                ← Volver a la Tienda
            </Link>

            <div className="item-detail-content">
                <div className="item-image-wrapper">
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/item/${id}.png`}
                        alt={itemInfo.name}
                        className="item-detail-image"
                    />
                    <h1 className="item-detail-title">{itemInfo.name}</h1>
                    <p className="item-detail-price">Costo total: {itemInfo.gold.total} Oro</p>

                    {itemInfo.plaintext ? (
                        <p className="item-plaintext">
                            {itemInfo.plaintext}
                        </p>
                    ) : (
                        <p className="item-no-data">
                            Este objeto no tiene descripción.
                        </p>
                    )}
                </div>

                <div className="item-info-wrapper">
                    <div className="item-stats">
                        <h2>Estadísticas y Pasivas</h2>
                        {itemInfo.description ? (
                            <div
                                className="item-description-html"
                                dangerouslySetInnerHTML={{ __html: itemInfo.description }}
                            />
                        ) : (
                            <div className="item-description-html">
                                <p className="item-no-data">
                                    Este objeto no posee pasivas ni estadísticas adicionales.
                                </p>
                            </div>
                        )}
                    </div>

                    {itemInfo.from && itemInfo.from.length > 0 && (
                        <div className="item-recipe">
                            <h2>Receta de construcción</h2>
                            <div className="recipe-grid">
                                {itemInfo.from.map((componentId, index) => (
                                    <Link
                                        key={index}
                                        to={`/item/${componentId}`}
                                        className="recipe-component"
                                    >
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/item/${componentId}.png`}
                                            alt="Componente de receta"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}