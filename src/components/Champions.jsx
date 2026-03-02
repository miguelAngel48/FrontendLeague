import { useState, useEffect, useRef } from "react";
import './../champions.css'
import { Link } from "react-router-dom";

export default function Champions() {
    const [champion, setChampion] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const url = "https://ddragon.leagueoflegends.com/cdn/14.21.1/data/es_ES/champion.json";

    useEffect(() => {
        const fetchChampions = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setChampion(Object.values(data.data));
            } catch (error) {
                console.error("Error al cargar los datos", error)
            } finally {
                setLoading(false);
            }
        }
        fetchChampions();
    }, [])


    const filteredChampions = champion.filter((champ) =>
        champ.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDown(false);
    const handleMouseUp = () => setIsDown(false);

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    if (loading) return <h1>Cargando campeones ...</h1>

    return (
        <>
            <Link to='/' className="back-link">Volver al menú</Link>
            <h1 className="champions-title">Campeones</h1>


            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar campeón..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div
                className={`champions ${isDown ? 'active' : ''}`}
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {filteredChampions.length > 0 ? (
                    filteredChampions.map((champ) => (
                        <Link
                            to={`/champion/${champ.id}`}
                            key={champ.id}
                            className="champ-card"
                            onDragStart={(e) => e.preventDefault()}
                        >
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
                                alt={champ.name}
                            />
                            <div className="champ-info">
                                <h3>{champ.name}</h3>
                                <p>{champ.title}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <h2 className="no-results">No se encontraron campeones con ese nombre</h2>
                )}
            </div>
        </>
    );
}