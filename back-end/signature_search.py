import numpy as np
import faiss
import os

import torch.nn as nn
import torch
import torchvision
import torch.nn.functional as F

from torch import Tensor
from torch.nn import Linear, Conv2d, MaxPool2d, LocalResponseNorm, Dropout
from torch.nn.functional import relu
from torch.nn import Module
from PIL import Image
from siamese_model import SiameseConvNet, distance_metric
from preprocessing import convert_to_image_tensor, invert_image

path = '...'
d = 128
index = faiss.IndexFlatL2(d)
mapped = [0] * 100000

def load_model():
    device = torch.device('cpu')
    model = SiameseConvNet()
    model.load_state_dict(torch.load('siamese-mtasig-rms2-28.3.pt', map_location=device))
    model.eval()
    return model
#.................................................................................
def init():
  global index, mapped
  # nb = 100000                      # database size
  # nq = 10000                       # nb of queries
  # np.random.seed(1234)             # make reproducible
  # xb = np.random.random((nb, d)).astype('float32')
  # xb[:, 0] += np.arange(nb) / 1000.
  # print(xb.shape)

  id_folders = ["01", "02", "03", "04", "05", "06", "07", "08", "09"]

  cnt = 0
  db = []
  
  model = load_model()
  
  for id_folder in id_folders: # id_folder = 01, 02, 03, ...
    limit = 0
    for id_file in os.listdir(path + '\\' + id_folder): # id_file = 01_01.png, 01_02.npy, ...
      limit += 1
      # print(path + '\\' + id_folder + '\\' + id_file)
      img = Image.open(path + '\\' + id_folder + '\\' + id_file)
      img = convert_to_image_tensor(invert_image(img)).view(1, 1, 220, 155)
      vec = model.forward_once(img)
      db.append(vec.tolist())
      # print(vec)
      mapped[cnt] = int(id_folder)
      print(id_folder, limit, cnt)
      cnt += 1
      # if (limit == 3):
        # break
  db = np.array(db)
  db = np.squeeze(db)
  index.add(db)

  print(db.shape)
  print(index.ntotal)
  print("Init success!")

def get_index(vector):
  global index, mapped
  print(index.ntotal)
  dq = []
  dq.append(vector)
  dq = np.array(dq)
  dq = dq.reshape(1, 128)
  print(dq)
  print(dq.shape)
  D, I = index.search(dq, 2)
  print(D)
  print(I)
  return mapped[I[0][0]]

