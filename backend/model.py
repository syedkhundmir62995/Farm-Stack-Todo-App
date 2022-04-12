from pydantic import BaseModel

class Todo(BaseModel):
    title: str #This is the unique key
    description: str