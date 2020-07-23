const Teacher = require("../models/Teachers")
const { age, date } = require("../../lib/utils")

module.exports = {
    index (req, res) {

        /*
        Teacher.all( function (teachers) {
            return res.render("teachers/index", {teachers})
        })  
        */    

        //return res.render("teachers/index")

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit, 
            offset,
            callback(teachers) { 
                
                if (teachers.length > 0) {
                    const pagination = {
                        total: Math.ceil(teachers[0].total / limit),
                        page
                    }
    
                    return res.render("teachers/index", { teachers, filter, pagination } )
                }
                else {
                    return res.render("teachers/index", { teachers , filter } )
                }
       
            }
        }

        Teacher.paginate(params)

    },
    create (req, res) {
        return res.render("teachers/create")
    },
    post (req, res) {
        const keys = Object.keys(req.body)

        console.log(keys)

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send('Information missing...Please complete fields')
            }
        }

        Teacher.create(req.body, function (teacher) {

            //console.log(teacher.id)

            return res.redirect(`/teachers/${teacher.id}`)
        })     
    },
    show (req, res) {
        
        Teacher.find(req.params.id, function(teacher) {

            if(!teacher) return res.send("Teacher not found!!")

            //console.log(teacher)

            teacher.age = age(teacher.birth_date)
            teacher.subjects_taught = teacher.subjects_taught.split(',')     
            
            teacher.create_at = date(teacher.created_at).format
            //console.log(teacher)
            

            return res.render("teachers/show", { teacher } )

        }) 
    },
    edit (req, res) {

        Teacher.find(req.params.id, function(teacher) {

            if(!teacher) return res.send("Teacher not found!!")

            teacher.birth_date = date(teacher.birth_date).iso

            return res.render("teachers/edit", { teacher } ) 
        })
    },
    put (req, res) {
        const keys = Object.keys(req.body)

        console.log(keys)

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send('Information missing...Please complete fields')
            }
        }

        Teacher.update(req.body, function () {

            return res.redirect(`/teachers/${req.body.id}`)
        })     
    },
    delete (req, res) {
        Teacher.delete (req.body.id, function () {
            return res.redirect(`/teachers`)
        })
    },
}