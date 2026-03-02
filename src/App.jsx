import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const [champs, setChamps] = useState([]);
  const [items, setItems] = useState([]);
  const [champIndex, setChampIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const resChamps = await fetch("https://ddragon.leagueoflegends.com/cdn/14.21.1/data/es_ES/champion.json");
        const dataChamps = await resChamps.json();
        setChamps(Object.values(dataChamps.data));


        const resItems = await fetch("https://ddragon.leagueoflegends.com/cdn/14.21.1/data/es_ES/item.json");
        const dataItems = await resItems.json();
        setItems(Object.keys(dataItems.data));

        setLoading(false);
      } catch (error) {
        console.error("Error cargando datos en el Hub", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading || champs.length === 0) return;

    const timer = setInterval(() => {
      setChampIndex((prev) => (prev + 1) % champs.length);
      setItemIndex((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [loading, champs.length, items.length]);

  if (loading) return <div className="loading-hub">Iniciando Cliente...</div>;

  return (
    <div className="hub-container">
      <div className="hub-options">

        <Link to="/champions" className="hub-card">
          <div className="hub-image-container">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champs[champIndex].id}_0.jpg`}
              alt="Champions"
              className="hub-image-champ"
            />
            <div className="hub-overlay">
              <span>CAMPEONES</span>
            </div>
          </div>
        </Link>

        <Link to="/items" className="hub-card">
          <div className="hub-image-container">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/item/${items[itemIndex]}.png`}
              className="hub-image-blur"
              alt=""
            />
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/item/${items[itemIndex]}.png`}
              className="hub-image-item"
              alt="Items"
            />
            <div className="hub-overlay">
              <span>OBJETOS</span>
            </div>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default App