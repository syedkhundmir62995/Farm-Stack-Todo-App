from http import client
from urllib import response
from model import Todo
import asyncstdlib as a

# MongoDb Driver
from motor import motor_asyncio

client = motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')

# Creating a TodoList DB
database = client.TodoList

# Creating a collection Todo
collection = database.todo


# Fetch One Todo
async def fetch_one_todo(title):
    # print(f"title is {title}")
    document = await collection.find_one({"title": title},{"_id":0})
    return document


# Fetch all todos
async def fetch_all_todos():
    todos = []
    cursor = collection.find()
    # print("***********")
    async for index, document in a.enumerate(cursor):
        todos.append(Todo(**document))
    # print(todos)
    return todos

# Insert a Todo
async def insert_todo(data):
    document = data
    print(document)
    query = await collection.find_one({"title": data["title"]}, {"_id": 0})
    if query:
        return {"warning": "Todo Already Exist"}
    await collection.insert_one(data)
    response = await collection.find_one({"title": data["title"]}, {"_id": 0})
    return response
    
# Update a Todo
async def updation_of_todo(data):
    title = data["title"]
    desc = data['description']
    await collection.update_one({"title": title},
    {"$set":{"description": desc}})

    response = await collection.find_one({"title": title}, {"_id":0})
    return response


# Delete a todo
async def deletion_of_todo(title):
    response = await collection.find_one({"title": title},{"_id":0})
    # print("Resssponce is", response)
    if response:
        await collection.delete_one({"title": title})
        return True
    else:
        return False
