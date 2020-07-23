const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
    all (callback) {

        const query = `
                       SELECT * 
                       FROM students 
                       ORDER BY name ASC
        ` 
   
        db.query (query, function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows)            
        })
        

    },
    create(data, callback) {

        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                birth_date,
                email,
                current_year,
                week_hours,
                created_at,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.email,
            data.current_year,
            data.week_hours,
            date(Date.now()).iso,
            data.teacher
        ]
        
        db.query(query, values, function(err, results) {
            if (err) 
                throw `Database Error!!! - ${err}` 

            callback(results.rows[0] )

        })
    },
    find(id, callback) {
        
        const query = `
            SELECT * 
            FROM students
            WHERE id = $1    
        `
        
        db.query(query, [id], function(err, results) {
            if (err) 
                throw `Database Error!!! - ${err}` 

            callback(results.rows[0] )

        })  
 
            
    },
    update(data, callback) {

        const query = `
            UPDATE students SET
                avatar_url = ($1),
                name = ($2),
                birth_date = ($3),
                email = ($4),
                current_year = ($5),
                week_hours = ($6),
                teacher_id = ($7)
            WHERE id = $8
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.email,
            data.current_year,
            data.week_hours,  
            data.teacher,          
            data.id
        ]
        
        db.query(query, values, function(err, results) {
            if (err) 
                throw `Database Error!!! - ${err}` 
 
            callback( )
        })
    },
    delete(id, callback) {

        const query = `DELETE
                       FROM students 
                       WHERE id = $1`        

        db.query (query, [id], function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows[0])            
        })
    },
    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = "", 
            filterQuery = "",
            totalQuery = `( SELECT count (*) FROM students ) AS total `

        if ( filter ) {

            filterQuery = `
                    WHERE students.name ILIKE '%${filter}%' OR students.email ILIKE '%${filter}%'
            `

            totalQuery = `( SELECT count (*) FROM students ${filterQuery} ) 
            AS total `
        }

        query = `
                    SELECT students.*, ${totalQuery}
                    FROM students 
                    ${filterQuery}
                    LIMIT $1 OFFSET $2
        `

        
        db.query(query, [limit, offset], function (err, results) {

            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows)
        }) 
    },
    teachersSelectOptions(callback) {
        const query = `
                        SELECT name, id 
                        FROM teachers
                      `        

        db.query (query, function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows)            
        })
    },
}
