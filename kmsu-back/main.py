from typing import Union

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import string
import random
import os
_LENGTH = 12
string_pool = string.digits

def randomString(length):
    result = ""
    for _ in range(length):
        result += random.choice(string_pool)
    return result

import base64

import easyocr
reader = easyocr.Reader(['en', 'ko'], gpu=True) # this needs to run only once to load the model into memory

class guildRecognition(BaseModel):
  URLArray: list[str]


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
def read_item(body: guildRecognition):
    body_dict = body.dict()
    URLArray = body_dict['URLArray']

    imgDirectory = f'.\\temp\\guild\\{randomString(_LENGTH)}'
    os.mkdir(imgDirectory)
    result = []
    cnt = 0
    
    for base64URL in URLArray:
        cnt+=1
        filename = str(cnt) + ".png"
        filePath = os.path.join(imgDirectory, filename)

        prefix = 'data:image/png;base64,'
        base64URL = base64URL[len(prefix):]
        imgData = base64.b64decode(base64URL + '=' * (-len(base64URL) % 4))
        
        with open(filePath, 'wb') as f:
            f.write(imgData)
        print(result)
        result.append(reader.readtext(filePath))
    
    return {"result": result}
    # return {"item_id": item_id, "q": q}