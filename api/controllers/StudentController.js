/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "annq"));


const session = driver.session();

module.exports = {
  
    showStudents: async (req, res) => {
        let students = [];
        try {
                let arrRecord = await session.run('MATCH (student:Student) RETURN student');
                arrRecord.records.forEach((record) => {
                    console.log(record.get("student"));
                students.push(record.get("student").properties);
            });
            res.view('pages/homepage', {students});
        } catch (error) {
            console.log(error);
            return;
        }
        session.close();
    }

};

