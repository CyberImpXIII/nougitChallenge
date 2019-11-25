const client = new ApolloClient({
    uri: 'http://localhost:4000/',
  });  

const queries = {
    noFilt :()=>{client
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
        .then(result => setEntries(entries.concat(result.data.getEntries)))
        .then(()=>{setIsLoading(false)})
    }

}