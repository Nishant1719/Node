const pool = require("../../db")
const queries = require("./queries")


const getStudents = (req, res) => {
    pool.query(queries.getStudents,(error,result)=>{
        if (error) return res.send({status:"Error"});
        res.status(200).json(result.rows);
    })
}

const getStudentsById = (req,res)=>{
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(error) return res.send("Error")
        res.status(200).json(results.rows)
    })
}

const addStudent = (req,res)=>{
    const {name, email, age, dob} = req.body;
    pool.query(queries.checkEmailExists,[email],(error,results)=>{
        if (results.rows.length){
            res.send("Email already exists");
        }
    pool.query(queries.addStudent,[name, email, age, dob],()=>{
        if(error) throw error;
        res.status(201).send("Student Created Successfully")
    })
        
    })
}
module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
};