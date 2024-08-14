import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);
  const [countries, setCountries] = useState([]);

  const checkExistance = () => {
    return countries.find((c) => {
      if (c.country.toLowerCase() === country.toLowerCase()) {
        return true;
      } else {
        return false;
      }
    });
  };

  const addCountryHandler = (e) => {
    e.preventDefault();
    if (checkExistance()) {
      alert("이미 등록된 국가입니다");
    } else {
      const newCountry = {
        id: new Date().getTime(),
        country: country,
        gold: gold,
        silver: silver,
        bronze: bronze,
      };
      setCountries([...countries, newCountry].sort((a, b) => b.gold - a.gold));
    }
  };

  const updateCountryHandler = () => {
    // (1) 컨트리스 안에 객체 중에 컨트리가 유저가 입력한 컨트리와 일치하는 객체를 찾는다 MAP IF
    const updatedCountry = {
      id: countries.id,
      country: country,
      gold: gold,
      silver: silver,
      bronze: bronze,
    };
    const result = countries.map(function (item) {
      if (item.country === country) {
        return updatedCountry;
      } else {
        return item;
      }
    });
    setCountries(result.sort((a, b) => b.gold - a.gold));
  };
  // (2) 일치 할 경우에는 해당 객체의 골드,실버,브론즈의 밸류를 입력한 값으로 바꿔서 리턴
  // (3) 일치하지 않을 경우 그대로 리턴

  const deleteCountryHandler = (id) => {
    const deletedCountry = countries.filter(function (country) {
      return country.id != id;
    });

    setCountries(deletedCountry);
  };

  return (
    <main className="container">
      <h3 className="title">2024 파리올림픽</h3>
      <div className="inner-box">
        <div className="inputBox">
          <p>국가명</p>
          <input
            type="text"
            placeholder="국가 입력"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </div>
        <div className="inputBox">
          <p>금메달</p>
          <input
            type="number"
            value={gold}
            onChange={(e) => {
              setGold(e.target.value);
            }}
          />
        </div>
        <div className="inputBox">
          <p>은메달</p>
          <input
            type="number"
            value={silver}
            onChange={(e) => {
              setSilver(e.target.value);
            }}
          />
        </div>
        <div className="inputBox">
          <p>동메달</p>
          <input
            type="number"
            value={bronze}
            onChange={(e) => {
              setBronze(e.target.value);
            }}
          />
        </div>
        <button className="button" onClick={addCountryHandler}>
          국가추가
        </button>
        <button className="button" onClick={updateCountryHandler}>
          업데이트
        </button>
      </div>

      <table border="0">
        <thead>
          <tr>
            <th>국가별</th>
            <th>금메달</th>
            <th>은메달</th>
            <th>동메달</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c) => (
            <tr key={c.id}>
              <td>{c.country}</td>
              <td>{c.gold}</td>
              <td>{c.silver}</td>
              <td>{c.bronze}</td>
              <td>
                <button onClick={(e) => deleteCountryHandler(c.id)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default App;
