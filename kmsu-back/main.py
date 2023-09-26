from typing import Union

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class guildRecognition(BaseModel):
  URLArray: list[str] = []


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/guildRecognition")
def read_item(URLArray: guildRecognition):

    return {"URLArray": URLArray}
    # return {"item_id": item_id, "q": q}