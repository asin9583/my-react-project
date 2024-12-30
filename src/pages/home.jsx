import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const games = [
  {
    name: "Ghost of Tsushima",
    image: "/img/Ghost of Tsushima.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", "AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Grand Theft Auto V",
    image: "/img/Grand Theft Auto V.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Cyberpunk 2077",
    image: "/img/Cyberpunk 2077.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", "AMD Ryzen 7 7800X3D"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Elden Ring",
    image: "/img/Elden Ring.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],

    },
  },
  {
    name: "Red Dead Redemption 2",
    image: "/img/Red Dead Redemption 2.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 3400G "],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Detroit Become Human",
    image: "/img/Detroit Become Human.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 3400G "],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Devil May Cry 5",
    image: "/img/Devil May Cry 5.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 3400G "],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Monster Hunter World",
    image: "/img/Monster Hunter World.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 3400G "],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Hogwarts Legacy",
    image: "/img/Hogwarts Legacy.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", "AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Call of Duty Black Ops 6",
    image: "/img/Call of Duty Black Ops 6.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 3400G "],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Warhammer 40,000Darktide",
    image: "/img/Warhammer 40,000Darktide.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", "AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Lost Judgment",
    image: "/img/Lost Judgment.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100 ", " AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Black Myth: Wukong",
    image: "/img/Black Myth Wukong.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", "AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Assassin's Creed Valhalla",
    image: "/img/Assassin's Creed Valhalla.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "The Last of Us Part 1",
    image: "/img/The Last of Us Part 1.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "The Witcher 3: Wild Hunt",
    image: "/img/The Witcher 3 Wild Hunt.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 3400G "],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "God of War Ragnarök",
    image: "/img/God of War Ragnarok.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 3400G "],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Dead Space",
    image: "/img/Dead Space.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
  {
    name: "Diablo IV",
    image: "/img/Diablo IV.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],

    },
  },
  {
    name: "A Plague Tale Requiem",
    image: "/img/A Plague Tale Requiem.jpg",
    requirements: {
      cpu: ["Intel Core i3-14100", " AMD Ryzen 5 5600"],
      gpu: ["NVIDIA GeForce RTX 3060", "AMD Radeon RX 7600"],
    },
  },
];

const Home = () => {
  const [selectedGames, setSelectedGames] = useState([]);
  const navigate = useNavigate();

  const handleGameClick = (gameName) => {
    setSelectedGames((prevSelectedGames) =>
      prevSelectedGames.includes(gameName)
        ? prevSelectedGames.filter((g) => g !== gameName)
        : [...prevSelectedGames, gameName]
    );
  };

  const handleCheckRequirements = () => {
    if (selectedGames.length === 0) {
      alert("請至少選擇一個遊戲");
      return;
    }

    const selectedRequirements = selectedGames.map((gameName) => {
      const game = games.find((g) => g.name === gameName);
      return game ? game.requirements : null;
    });

    const cpus = [...new Set(selectedRequirements.flatMap((req) => req?.cpu || []))];
    const gpus = [...new Set(selectedRequirements.flatMap((req) => req?.gpu || []))];

    alert(`您選擇的遊戲：${selectedGames.join(", ")}\n\n推薦配備：\nCPU: ${cpus.join(", ")}\nGPU: ${gpus.join(", ")}`);

    const searchQuery = [...cpus, ...gpus].join(" ");
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="home-container" style={{ backgroundColor: "black", color: "white" }}>
      {/* 遊戲檢查區域 */}
      <div style={{ margin: "50px auto", color: "white", textAlign: "center", maxWidth: "800px" }}>
        <h1>你想運行什麼遊戲</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {games.map((game) => (
            <div
              key={game.name}
              onClick={() => handleGameClick(game.name)}
              style={{
                border: selectedGames.includes(game.name) ? "4px solid orange" : "2px solid gray",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
              }}
            >
              <img
                src={game.image}
                alt={game.name}
                style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px" }}
              />
              <p style={{ marginTop: "10px", fontWeight: "bold", color: "black" }}>{game.name}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleCheckRequirements}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            執行建議配備
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


