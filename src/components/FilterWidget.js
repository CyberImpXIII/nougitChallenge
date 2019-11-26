import React from 'react'

export default function filterWidget(
    {setAllSelected, setCompletedSelected, setTrendingSelected, setOpenSelected, allSelected, trendingSelected, openSelected, completedSelected}){
    return(<div className='filterWidget'>
        <div className='filterText'>Filter by:</div>
        <div className={allSelected ? 'widgetButton selected' : 'widgetButton'} onClick={()=>{
          setAllSelected(true);
          setCompletedSelected(false);
          setTrendingSelected(false);
          setOpenSelected(false);
        }}>All</div>
        <div className={trendingSelected ? 'widgetButton selected' : 'widgetButton'} onClick={()=>{
          setAllSelected(false);
          setCompletedSelected(false);
          setTrendingSelected(true);
          setOpenSelected(false);
        }}>Trending</div>
        <div className={openSelected ? 'widgetButton selected' : 'widgetButton'} onClick={()=>{
          setAllSelected(false);
          setCompletedSelected(false);
          setTrendingSelected(false);
          setOpenSelected(true);
        }}>Open Tasks</div>
        <div className={completedSelected ? 'widgetButton selected' : 'widgetButton'} onClick={()=>{
          setAllSelected(false);
          setCompletedSelected(true);
          setTrendingSelected(false);
          setOpenSelected(false);
        }}>Completed Tasks</div>
      </div>
    )
}