from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Todo
from database import (fetch_all_todos,
                      fetch_one_todo,  
                      insert_todo,
                      updation_of_todo,
                      deletion_of_todo
                        )

# App Object
app = FastAPI()

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def home_page():
    return {"Home":"Home Page"}


# 1. Read a todo
# 2. Read all todos
# 3. Add a todo
# 4. Update a todo
# 5. Delete a todo


# Get all todos
@app.get("/api/todo")
async def get_todos():
    return await fetch_all_todos()

# Get a todo by title
@app.get("/api/todo/{title}")
async def get_todo_by_title(title):
    res = await fetch_one_todo(title)
    if res:
        return res
    raise HTTPException(404,"Todo Does Not Exist !!")

# Add a todo
@app.post("/api/addtodo")
async def add_todo(data: Todo):
    res = await insert_todo(dict(data))
    if res:
        return res
    raise HTTPException(404, "Todo Is Not Inserted")

# Update a todo
@app.put("/api/updatetodo/{title}")
async def update_todo(title,desc):
    res = await updation_of_todo(title, desc)
    if res:
        return res
    raise HTTPException(404, "Todo Is Not Updated")

# Delete a todo
@app.delete("/api/deletetodo/{title}")
async def delete_todo(title):
    res = await deletion_of_todo(title)
    if res:
        return res
    raise HTTPException(404, "Todo Is Does Not Exist")

