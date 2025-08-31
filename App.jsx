import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [videos, setVideos] = useState([]);
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");

  const [newPlayer, setNewPlayer] = useState({ name: "", image: "" });
  const [newCoach, setNewCoach] = useState({ name: "", image: "" });
  const [newVideo, setNewVideo] = useState({ title: "", link: "", file: null });
  const [newMatch, setNewMatch] = useState({ team1: "", team2: "", date: "" });

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "player") setNewPlayer({ ...newPlayer, image: reader.result });
      if (type === "coach") setNewCoach({ ...newCoach, image: reader.result });
      if (type === "video") setNewVideo({ ...newVideo, file: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addPlayer = () => {
    setPlayers([...players, newPlayer]);
    setNewPlayer({ name: "", image: "" });
  };

  const addCoach = () => {
    setCoaches([...coaches, newCoach]);
    setNewCoach({ name: "", image: "" });
  };

  const addVideo = () => {
    setVideos([...videos, newVideo]);
    setNewVideo({ title: "", link: "", file: null });
  };

  const addMatch = () => {
    setMatches([...matches, newMatch]);
    setNewMatch({ team1: "", team2: "", date: "" });
  };

  const filteredPlayers = players.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="flex space-x-4 mb-6">
        <button onClick={() => setPage("home")} className="px-4 py-2 bg-blue-500 text-white rounded">الرئيسية</button>
        <button onClick={() => setPage("players")} className="px-4 py-2 bg-blue-500 text-white rounded">اللاعبون</button>
        <button onClick={() => setPage("coaches")} className="px-4 py-2 bg-blue-500 text-white rounded">المدربون</button>
        <button onClick={() => setPage("videos")} className="px-4 py-2 bg-blue-500 text-white rounded">الفيديوهات</button>
        <button onClick={() => setPage("matches")} className="px-4 py-2 bg-blue-500 text-white rounded">المباريات</button>
      </nav>

      {page === "home" && <h1 className="text-2xl font-bold">مرحباً بك في مدير الرياضة</h1>}

      {page === "players" && (
        <div>
          <h2 className="text-xl font-bold mb-4">إدارة اللاعبين</h2>
          <input
            type="text"
            placeholder="بحث عن لاعب..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <input
            type="text"
            placeholder="اسم اللاعب"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "player")} />
          <button onClick={addPlayer} className="px-4 py-2 bg-green-500 text-white rounded ml-2">إضافة</button>
          <ul className="mt-4">
            {filteredPlayers.map((p, i) => (
              <li key={i} className="border p-2 my-2 flex items-center">
                {p.image && <img src={p.image} alt="player" className="w-12 h-12 rounded-full mr-2" />}
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {page === "coaches" && (
        <div>
          <h2 className="text-xl font-bold mb-4">إدارة المدربين</h2>
          <input
            type="text"
            placeholder="اسم المدرب"
            value={newCoach.name}
            onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "coach")} />
          <button onClick={addCoach} className="px-4 py-2 bg-green-500 text-white rounded ml-2">إضافة</button>
          <ul className="mt-4">
            {coaches.map((c, i) => (
              <li key={i} className="border p-2 my-2 flex items-center">
                {c.image && <img src={c.image} alt="coach" className="w-12 h-12 rounded-full mr-2" />}
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {page === "videos" && (
        <div>
          <h2 className="text-xl font-bold mb-4">إدارة الفيديوهات</h2>
          <input
            type="text"
            placeholder="عنوان الفيديو"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="رابط الفيديو (اختياري)"
            value={newVideo.link}
            onChange={(e) => setNewVideo({ ...newVideo, link: e.target.value })}
            className="border p-2 mr-2"
          />
          <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, "video")} />
          <button onClick={addVideo} className="px-4 py-2 bg-green-500 text-white rounded ml-2">إضافة</button>
          <ul className="mt-4">
            {videos.map((v, i) => (
              <li key={i} className="border p-2 my-2">
                <p>{v.title}</p>
                {v.link && <a href={v.link} target="_blank" className="text-blue-500">رابط الفيديو</a>}
                {v.file && <video src={v.file} controls className="w-full h-48 mt-2"></video>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {page === "matches" && (
        <div>
          <h2 className="text-xl font-bold mb-4">إدارة المباريات</h2>
          <input
            type="text"
            placeholder="الفريق الأول"
            value={newMatch.team1}
            onChange={(e) => setNewMatch({ ...newMatch, team1: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="الفريق الثاني"
            value={newMatch.team2}
            onChange={(e) => setNewMatch({ ...newMatch, team2: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="date"
            value={newMatch.date}
            onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={addMatch} className="px-4 py-2 bg-green-500 text-white rounded ml-2">إضافة</button>
          <ul className="mt-4">
            {matches.map((m, i) => (
              <li key={i} className="border p-2 my-2">{m.team1} ضد {m.team2} - {m.date}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}