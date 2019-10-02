// Load areas 
LOAD CSV FROM 'https://raw.githubusercontent.com/ouracademy/essboard-kernel/master/migrations/areas.csv' AS line
CREATE (:Area { id: line[0], name:line[1],color:line[2] })

// Load alphas 
LOAD CSV FROM 'https://raw.githubusercontent.com/ouracademy/essboard-kernel/master/migrations/alphas.csv' AS line
CREATE (:Alpha { id: line[0], name:line[1] })

// Load areas alphas
LOAD CSV FROM 'https://raw.githubusercontent.com/ouracademy/essboard-kernel/master/migrations/areas-alphas.csv' AS line
MATCH (area:Area),(alpha:Alpha)
WHERE area.id = line[0] AND alpha.id = line[1]
CREATE (alpha)-[r:BELONGS_AREA]->(area)
RETURN r

// Load  alphas relationship
LOAD CSV FROM 'https://raw.githubusercontent.com/ouracademy/essboard-kernel/master/migrations/alphas-relationship.csv' AS line
MATCH (from:Alpha),(to:Alpha)
WHERE from.id = line[0] AND to.id = line[2]
CREATE (from)-[r: ALPHA_RELATIONSHIP{ name : line[1]}]->(to)
RETURN r

// Load state and alpha state

LOAD CSV FROM 'https://raw.githubusercontent.com/ouracademy/essboard-kernel/master/migrations/states.csv' AS line
CREATE (state:State { number: toString(toInteger(line[0])%10), name : line[1], id: line[0] })
WITH state
MATCH (alpha:Alpha)
WHERE alpha.id = toString(toInteger(state.id)/10)
CREATE (state)-[r:BELONGS_ALPHA]->(alpha)
RETURN r

// Load previous states 

MATCH (state:State),(previous:State)
WHERE toInteger(state.id)%10>1 and previous.id = toString(toInteger(state.id)-1)
CREATE (previous)-[r:PREVIOUS_FROM]->(state)
RETURN r


//  Load checkpoints

LOAD CSV FROM 'https://raw.githubusercontent.com/ouracademy/essboard-kernel/master/migrations/checkpoints.csv' AS line
CREATE (checkpoint:Checkpoint { id: line[0], name : line[2], description: line[3], isVisibleInCard: toBoolean(line[4]) })
WITH checkpoint, line
MATCH (state:State)
WHERE state.id = line[1]
CREATE (state)-[r:HAS_CHECKPOINTS]->(checkpoint)
RETURN r
