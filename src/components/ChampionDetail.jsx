import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './../championDetail.css';

export default function ChampionDetail() {
    const { id } = useParams();
    const [championInfo, setChampionInfo] = useState(null);
    const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`;

    useEffect(() => {
        const fetchDetalls = async () => {
            try {
                const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.21.1/data/es_ES/champion/${id}.json`);
                const data = await response.json();
                const infoChampionData = data.data[id];
                setChampionInfo(infoChampionData);
            } catch (error) {
                console.error("Error al cargar la información del Campeón", error);
            }
        };
        fetchDetalls();
    }, [id]);


    if (!championInfo) return <h2 className="loading-text">Invocando datos...</h2>;

    return (
        <>
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.95)), url(${splashUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100vw",
                    minHeight: "100vh",
                    color: "white",
                    padding: "40px",
                    boxSizing: "border-box",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: -1
                }}
            />
            <div className="champion-content">
                <Link to="/champions" className="back-button">
                    Volver a la Selección
                </Link>
                <h1 className="champion-title">{championInfo.name}</h1>
                <h3 className="champion-subtitle">{championInfo.title}</h3>
                <p className="champion-lore">{championInfo.lore}</p>

                <div className="info-grid">

                    <div className="stats-section">
                        <h2>Estadísticas Base</h2>
                        <ul>
                            <li><strong>Vida:</strong> {championInfo.stats.hp}</li>
                            <li><strong>Maná/Energía:</strong> {championInfo.stats.mp}</li>
                            <li><strong>Daño de Ataque:</strong> {championInfo.stats.attackdamage}</li>
                            <li><strong>Armadura:</strong> {championInfo.stats.armor}</li>
                            <li><strong>Resistencia Mágica:</strong> {championInfo.stats.spellblock}</li>
                            <li><strong>Velocidad de Movimiento:</strong> {championInfo.stats.movespeed}</li>
                        </ul>
                    </div>


                    <div className="abilities-section">
                        <h2>Habilidades</h2>


                        <div className="ability-card">
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/passive/${championInfo.passive.image.full}`}
                                alt={championInfo.passive.name}
                            />
                            <div className="ability-info">
                                <h4>{championInfo.passive.name} <span>(Pasiva)</span></h4>
                                <p dangerouslySetInnerHTML={{ __html: championInfo.passive.description }} />
                            </div>
                        </div>


                        {championInfo.spells.map((spell, index) => {
                            const teclas = ["Q", "W", "E", "R"];
                            return (
                                <div key={spell.id} className="ability-card">
                                    <img
                                        src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/spell/${spell.image.full}`}
                                        alt={spell.name}
                                    />
                                    <div className="ability-info">
                                        <h4>{spell.name} <span>({teclas[index]})</span></h4>
                                        <p dangerouslySetInnerHTML={{ __html: spell.description }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

