import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Pagination({total, perPage, pageNow}) {

    const [pages, setPages] = useState([]);
    const [arrLeft, setArrLeft] = useState(0);
    const [arrRight, setArrRight] = useState(0);
 
    //declaring number of pages
    useEffect(() => {
        const p = [];
        const count = Math.ceil(total /perPage);
        for (let i = 0; i < count; i++){
            p.push(i+1)
        }
        setPages(p);
    
    }, [total, perPage]);   
        
//showing arrows left and right regarding to chosen page
    useEffect(() => {     
        const  pn = parseInt(pageNow);
        if (pn  === 1) setArrLeft(0);
        else setArrLeft(pn - 1);
        const count = Math.ceil(total /perPage);
        if (pn === count) setArrRight(0);
        else setArrRight(pn + 1);

    }, [pageNow, total, perPage]);

    return(
        <div className='pagination'>
            {
                arrLeft ? <Link to={'/' + arrLeft} className='btn1'> <svg className="arrow-left"><use xlinkHref="#arrow"></use></svg></Link> : null
            }
            {
                pages.map(p => <Link to={'/' + p} key={p} className='btn1'>{p}</Link>)
            }
            {
            arrRight ? <Link to={'/' + arrRight} className='btn1'> <svg className="arrow-right"><use xlinkHref="#arrow"></use></svg> </Link>  : null
            }
        </div>
    )

};

export default Pagination;