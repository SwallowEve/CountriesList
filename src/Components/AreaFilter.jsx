
function AreaFilter({filterRegion, setFilterRegion, filterArea, setFilterArea}){
    
    return( 
        <div className='filterBlock'>            
            <select className='btn' id='areaId' onChange={e => setFilterArea(e.target.value)}>
                <option value='0' disabled selected >Area less than</option>
                <option value='65300'>Lithuania</option>
            </select>

            <select className='btn' id='regionId' onChange={e => setFilterRegion(e.target.value)}>
                <option value='0' disabled selected >Filter by Region</option>
                <option value='Oceania'>Oceania region</option>
            </select>
        </div>
    )
}

export default AreaFilter;