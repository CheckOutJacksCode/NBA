I tried res.sending the error back from the backend, I've had it print out the error message to postman, but I would much rather send that error back up to the 'getJsonResponse' in the front end so I can catch all the different errors in that one catch block.

After reading some of the recommended questions, it looks like error checking on the server end is paramount. My new evolved question after some reading, how would I exactly call an error handler middleware from the boxScoresTraditionalQueries.js file? Here is the code one more time from the database query, in the if(error){ throw error } block, how would I call an error handler middleware?


```
```
const getBoxScoreTraditionalHome = (request, response) => {
    const {playerid, season} = request.params;
 
    let newSeason = JSON.stringify(season);
    let stringSeason = newSeason.replace(/"/g, '');
    db.query(`SELECT * FROM "boxscorestraditional${stringSeason}" 
              INNER JOIN "boxscoresummary${stringSeason}" 
              ON "boxscorestraditional${stringSeason}".game_id = "boxscoresummary${stringSeason}".game_id
              WHERE player_id = $1
              AND "boxscoresummary${stringSeason}".home_team_id = "boxscorestraditional${stringSeason}".team_id
              ORDER BY "boxscorestraditional${stringSeason}".id`, [playerid], (error, results) => {
      if (error) {
         throw error
      }
      response.status(200).json(results.rows)
    })
}
```

```

Sorry if I'm being redundant. This program got way too big too fast and I am, with shame, going back to document/errorhandle/test everything. I just want to get one route perfect, so I have a template to crank out the rest of the routes.
 
Thanks,
Jack