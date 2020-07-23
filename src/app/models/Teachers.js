const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
    all (callback) {

        /*
        const query = `
                        SELECT teachers.*, count(members) AS total_students 
                        FROM instructors 
                        LEFT JOIN members ON (members.instructor_id = instructors.id)
                        GROUP BY instructors.id
                        ORDER BY total_students DESC
       ` 
       */

        const query = `
                       SELECT * 
                       FROM teachers 
                       ORDER BY name ASC
        ` 
   
        db.query (query, function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows)            
        })
        

    },
    create(data, callback) {

        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso    // valor para o created_at
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
            FROM teachers
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
            UPDATE teachers SET
                avatar_url = ($1),
                name = ($2),
                birth_date = ($3),
                education_level = ($4),
                class_type = ($5),
                subjects_taught = ($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,            
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
                       FROM teachers 
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
            totalQuery = `( SELECT count (*) FROM teachers ) AS total `

        if ( filter ) {

            filterQuery = `
                    WHERE teachers.name ILIKE '%${filter}%' OR teachers.subjects_taught ILIKE '%${filter}%'
            `

            totalQuery = `( SELECT count (*) FROM teachers ${filterQuery} ) 
            AS total `
        }

        query = `
                    SELECT teachers.*, ${totalQuery}, count(students) AS total_students 
                    FROM teachers
                    LEFT JOIN students ON (teachers.id = students.teacher_id) 
                    ${filterQuery}
                    GROUP BY teachers.id 
                    LIMIT $1 OFFSET $2
        `

        
        db.query(query, [limit, offset], function (err, results) {

            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows)
        }) 
    }
}
