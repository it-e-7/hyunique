from fastapi import FastAPI, File
import uvicorn
import joblib
from sklearn.neighbors import NearestNeighbors
import tensorflow as tf
from typing_extensions import Annotated
from tensorflow.keras.preprocessing import image as kimage
from tensorflow.keras.applications.inception_v3 import InceptionV3, preprocess_input
import numpy as np
from PIL import Image
import io
import base64
from pydantic import BaseModel

class base64Image(BaseModel):
    image: str

app = FastAPI()

feature_list = joblib.load(open('./model/img_vector.pkl', 'rb'))
product_id_list = joblib.load(open('./model/id_list.pkl', 'rb'))
base_model = InceptionV3(weights='imagenet', include_top=False, pooling='avg')

def extract_features(img):
    x = kimage.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    features = base_model.predict(x)
    return features

def predict_idx(feature):
    knn = NearestNeighbors(n_neighbors=6)
    knn.fit(feature_list)

    predict = knn.kneighbors(feature.reshape(1, -1), return_distance=False)
    return list(map(predict_product, list(map(int, predict[0]))))

def predict_product(idx):
    return product_id_list[idx]

def preprocessing(bin):
    image = Image.open(io.BytesIO(bin))
    image = image.resize((299, 299))
    return image

@app.post("/img-search")
def aiSearch(base64img: base64Image):
  file = base64.b64decode(base64img.image)
  img = preprocessing(file)
  feature = extract_features(img)
  predict = predict_idx(feature)
  return predict

uvicorn.run(app, host="0.0.0.0", port=8000)