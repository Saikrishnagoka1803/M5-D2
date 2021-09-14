import express from "express"
import fs from "fs"
import uniqid from "uniqid"


const currentFilePath = fileURLToPath(import.meta.url)
console.log("IMPORT META URL: ", import.meta.url)
console.log("CURRENT FILE PATH: ", currentFilePath)
const currentDirPath = dirname(currentFilePath)
console.log("CURRENT DIRECTORY: ", currentDirPath)
const authorsJSONFilePath = join(currentDirPath, "authors.json")
console.log("STUDENTS.JSON PATH: ", studentsJSONFilePath)

const authorsRouter = express.Router()

export default authorsRouter

// get authors
authorsRouter.get("/", (req, res) => {

        const filecontent = fs.readFileSync(authorsJSONFilePath)
        console.log(JSON.parse(filecontent))
        const students = JSON.parse(filecontent)
        res.send(authors)
        console.log("hey Iam get")
})

// get specific authors
authorsRouter.get("/:authorID", (req, res) => {
    console.log("AUTHOR ID : ", req.params.authorID)
    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath))
    const author = authors.find(s => s.id === req.params.authorID)
    if (author) {
        res.send(author)
      } else {
        res.send("Not found!")
      }
    
})

// Post authors
authorsRouter.post("/", (req, res) => {

  console.log("REQUEST BODY: ", req.body)
  const newauthor = { ...req.body, id: uniqid(), createdAt: new Date() }
  console.log(newauthor)
  authors.push(newauthor)
  fs.writeFileSync(authorsJSONFilePath, JSON.stringify(authors))
  res.status(201).send({ id: newauthor.id })
})

// Put authors
authorsRouter.put("/:authorID", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath))
    const index = authors.findIndex(author => author.id === req.params.authorID)
    const updatedauthor = { ...authors[index], ...req.body }
    authors[index] = updatedauthor
    fs.writeFileSync(authorsJSONFilePath, JSON.stringify(authors))
    res.send(updatedauthor)
})

// Delete authors
authorsRouter.delete("/:authorID", (req, res) => {
    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath))
    const remainingauthors = authors.filter(author => author.id !== req.params.authorID)
    fs.writeFileSync(authorsJSONFilePath, JSON.stringify(remainingauthors))
    res.status(204).send()

})