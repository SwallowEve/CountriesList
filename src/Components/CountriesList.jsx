import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination";

function CountriesList({countries, countriesPerPage}){

    const {pageNow} = useParams(1)
    const [showCountries, setShowCountries] = useState([]);

    useEffect(() => {
      const  pn = parseInt(pageNow); 
      if (pn < 1 || pn > countries.length/countriesPerPage || isNaN) setShowCountries([{name:'404', region: 'Error 404 - Page not found',}])   
                    
      const start = countriesPerPage * (pn-1);     
      const end = countriesPerPage*pn;
       setShowCountries(countries.slice(start, end));
     
     }, [pageNow, countriesPerPage, countries]);

    return(
        <>
          <div className='countriesShow'>
            {
             showCountries.map((c, i) => <div key={i} className='countryBlock'><h4>{c.name}</h4><p>{c.region}</p><p><em>area: {c.area.toFixed(2)}</em></p></div>)
            }
        </div>
        <Pagination pageNow={pageNow} total={countries.length} perPage={countriesPerPage}></Pagination> 
      </>
    )
}

export default CountriesList;