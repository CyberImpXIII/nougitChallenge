import React, { useState, useEffect } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import './App.css'
import FilterWidget from './components/FilterWidget.js'
import Entry from './components/Entry.js'


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

function App() {
  
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allSelected, setAllSelected] = useState(true);
  const [trendingSelected, setTrendingSelected] = useState(false);
  const [openSelected, setOpenSelected] = useState(false);
  const [completedSelected, setCompletedSelected] = useState(false);

  function determineFilter(){
    if(openSelected){
      client
    .query({ query: gql`{
          getEntries(
            filter : "1"
            first: 5,
            skip: ${entries.length || 0}, 
            orderBy : ${trendingSelected ? "popularity_DESC" : "date_DESC"}
          ){
            author{
              name
              picture
              score
            }
            date
            popularity
            isTrending
            title
            description
            numComments
            thumbnail
            codeSubmissionTotal
            pledgeTotal
            pledgeGoal
            pledgerCount
            status
          }
        }
        `})
    .then(result => setEntries(isLoading ? entries.concat(result.data.getEntries) : result.data.getEntries))
    .then(()=>{setIsLoading(false)})
    }
    if(completedSelected){
      client
    .query({ query: gql`{
          getEntries(
            filter : "0"
            first: 5,
            skip: ${entries.length || 0}, 
            orderBy : ${trendingSelected ? "popularity_DESC" : "date_DESC"}
          ){
            author{
              name
              picture
              score
            }
            date
            popularity
            isTrending
            title
            description
            numComments
            thumbnail
            codeSubmissionTotal
            pledgeTotal
            pledgeGoal
            pledgerCount
            status
          }
        }
        `})
    .then(result => setEntries(isLoading ? entries.concat(result.data.getEntries) : result.data.getEntries))
    .then(()=>{setIsLoading(false)})
    }
    if(trendingSelected){
      client
    .query({ query: gql`{
          getEntries(
            filter : "True"
            first: 5,
            skip: ${entries.length || 0}, 
            orderBy : ${trendingSelected ? "popularity_DESC" : "date_DESC"}
          ){
            author{
              name
              picture
              score
            }
            date
            popularity
            isTrending
            title
            description
            numComments
            thumbnail
            codeSubmissionTotal
            pledgeTotal
            pledgeGoal
            pledgerCount
            status
          }
        }
        `})
    .then(result => setEntries(isLoading ? entries.concat(result.data.getEntries) : result.data.getEntries))
    .then(()=>{setIsLoading(false)})
    }else{
      client
    .query({ query: gql`{
          getEntries(
            first: 5,
            skip: ${entries.length || 0}, 
            orderBy : ${trendingSelected ? "popularity_DESC" : "date_DESC"}
          ){
            author{
              name
              picture
              score
            }
            date
            popularity
            isTrending
            title
            description
            numComments
            thumbnail
            codeSubmissionTotal
            pledgeTotal
            pledgeGoal
            pledgerCount
            status
          }
        }
        `})
    .then(result => setEntries(isLoading ? entries.concat(result.data.getEntries) : result.data.getEntries))
    .then(()=>{setIsLoading(false)})
    }
  }

  useEffect(()=>{
    determineFilter();
  },[allSelected, trendingSelected, openSelected,completedSelected])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    if (!isLoading) return;
    determineFilter()
  }, [isLoading]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsLoading(true);
  }

  return (
    <div className="App">
      <FilterWidget 
        allSelected={allSelected}
        trendingSelected={allSelected}
        openSelected={allSelected}
        completedSelected={allSelected}
        setAllSelected={setAllSelected}
        setCompletedSelected={setCompletedSelected}
        setTrendingSelected={setTrendingSelected}
        setOpenSelected={setOpenSelected}
      />
      {entries && entries.map((entry, i)=>(
        <Entry entry={entry} i={i} />
      ))}
      </div>
  );
}

export default App;
