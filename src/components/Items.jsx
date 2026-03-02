import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './../items.css';

export default function Items() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const url = "https://ddragon.leagueoflegends.com/cdn/14.21.1/data/es_ES/item.json";

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                const itemsArray = Object.entries(data.data).map(([id, itemData]) => ({
                    id: id,
                    ...itemData
                }));

                setItems(itemsArray);
            } catch (error) {
                console.error("Error al cargar los objetos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <h2 className="loading-text">Cargando la tienda...</h2>;

    return (
        <div className="items-container">
            <Link to='/' className="back-link">Volver al menú</Link>
            <h1 className="items-title">Objetos de League of Legends</h1>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar objeto..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="items-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <Link to={`/item/${item.id}`} key={item.id} className="item-card">
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/item/${item.id}.png`}
                                alt={item.name}
                                className="item-image"
                            />
                            <h4 className="item-name">{item.name}</h4>
                            <p className="item-description">{item.plaintext}</p>
                            <span className="item-price">{item.gold.total} Oro</span>
                        </Link>
                    ))
                ) : (
                    <h2 className="no-results">No se encontraron objetos con ese nombre</h2>
                )}
            </div>
        </div>
    );
}