import { useReducer, useEffect, useState, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { getCountries, sortAsc, sortDesc} from "./Actions/countries";
import countriesReducer from "./Reducers/countriesReducer";
import CountriesList from "./Components/CountriesList";
import AreaFilter from "./Components/AreaFilter";
import { COUNTRIES_PER_PAGE } from "./Constants";

function App() {
  const [countries, dispatchCountries] = useReducer(countriesReducer, []);
  const masterStore = useRef([]);
  const [filterArea, setFilterArea] = useState('0');
  const [filterRegion, setFilterRegion] = useState('0');


  
//getting data from API
  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all?fields=name,region,area")
      .then((res) => {
        masterStore.current = res.data;
        //console.log(masterStore.current)
        dispatchCountries(getCountries([...masterStore.current]));
        
      });
    
  }, []);

//setting localStorage on page load
  // useEffect(() => {
  //   let l = localStorage.getItem('countriesList');
  //       if (null === l) {
  //     localStorage.setItem('countriesList', []);
  //   }
  //   l = JSON.parse(l)
  //   dispatchCountries(getCountries(l);
  //     }, []);

//setting localStorage on state change
  // useEffect(()=> {
  //   localStorage.setItem('countriesList', JSON.stringify([...countries]));
    
  // }, [filterArea, filterRegion, countries])


// filtering by area less than Lithuania
  useEffect(() => {
    let copy = [...countries];
    let area = copy.filter(c => c.area < parseInt(filterArea));
    dispatchCountries(getCountries(area));
    //console.log(countries);
  
  }, [filterArea]);

  // filtering by "Oceania' region"
  useEffect(() => {
    let copy = [...countries];
    copy = filterRegion !== "0" ? copy.filter((country) => country.region === filterRegion) : copy;
    dispatchCountries(getCountries(copy));    

  }, [filterRegion]);

// clearing filters
  const clearButton = () => {
    setFilterArea('0');
    setFilterRegion('0');
    dispatchCountries(getCountries([...masterStore.current]));
    
    let clear1 = document.querySelector("#areaId");
    clear1.selectedIndex = 0;
    let clear2 = document.querySelector("#regionId");
    clear2.selectedIndex = 0;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h2>Countries on display</h2>
          <div className="additional">
            <div className="sortBlock">
              <button className="btn" onClick={() => dispatchCountries(sortAsc())}>Sort countries{" "}<svg className="arrow-up"><use xlinkHref="#arrow"></use></svg>
              </button>
              <button className="btn" onClick={() => dispatchCountries(sortDesc())}>Sort countries{" "}<svg className="arrow-down"><use xlinkHref="#arrow"></use></svg>
              </button>
            </div>

            <AreaFilter filterRegion={filterRegion} setFilterRegion={setFilterRegion} filterArea={filterArea} setFilterArea={setFilterArea}></AreaFilter>
            <button className="btn" onClick={clearButton}>Clear filters</button>
          </div>
        </header>

        <div className="App-body">
          <Routes>
            <Route
              path={"/:pageNow"}
              element={<CountriesList countries={countries} dispatchCountries={dispatchCountries} countriesPerPage={COUNTRIES_PER_PAGE}></CountriesList>}>
              </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
