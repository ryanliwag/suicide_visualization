
#pip install -U imbalanced-learn

def makeOverSamplesSMOTE(X,y):
 #input DataFrame
 #X →Independent Variable in DataFrame\
 #y →dependent Variable in Pandas DataFrame format
 from imblearn.over_sampling import SMOTE
 sm = SMOTE()
 X, y = sm.fit_sample(X, y)
 return X,y

def makeOverSamplesADASYN(X,y):
 #input DataFrame
 #X →Independent Variable in DataFrame\
 #y →dependent Variable in Pandas DataFrame format
 from imblearn.over_sampling import ADASYN 
 sm = ADASYN()
 X, y = sm.fit_sample(X, y)
 return(X,y)

#adasyn Coordinates.

from imblearn.over_sampling import  ADASYN

def adasyn(X,y):
    sm = ADASYN
    X, y = sm.fit_sample(X, y)
    return X, y

class RetBlock(nn.Module):

    def __init__(self):
        super(RetBlock, self).__init__()
        in_features = 1536
        self.liner_nose = nn.Linear(in_features, 4)
        self.liner_tail = nn.Linear(in_features, 5)
        self.liner_hand = nn.Linear(in_features, 4)
        self.liner_leg = nn.Linear(in_features, 4)

    def forward(self, x):
        x_nose = self.liner_nose(x)
        x_tail = self.liner_tail(x)
        x_hand = self.liner_hand(x)
        x_leg = self.liner_leg(x)
        
        return x_nose, x_tail, x_hand, x_hand, x_leg
# forward
outputs = model(inputs)
loss = 0

criterion = CrossEntropyLoss(reduce=False)
...
loss = 0
for lx in range(len(outputs)):
    loss = loss + (mask[:,lx]*criterion(outputs[lx], labels[:, lx])).mean()

for lx in range(len(outputs)):
    tmp_loss = criterion(outputs[lx], labels[:, lx])
    loss += tmp_loss

# backward + optimize only if in training phase
if phase == 'train':
    loss.backward()
    optimizer.step()    


import torch.nn as nn
import torch.nn.functional as F

class Model(nn.Module):
    def __init__(self):
        super(Model, self).__init__()
        self.conv1 = nn.Conv2d(1, 20, 5)
        self.conv2 = nn.Conv2d(20, 20, 5)

    def forward(self, x):
       x = F.relu(self.conv1(x))
       return F.relu(self.conv2(x))

# Example of using Sequential
model = nn.Sequential(
          nn.Conv2d(1,20,5),
          nn.ReLU(),
          nn.Conv2d(20,64,5),
          nn.ReLU()
        )

# Example of using Sequential with OrderedDict
model = nn.Sequential(OrderedDict([
          ('conv1', nn.Conv2d(1,20,5)),
          ('relu1', nn.ReLU()),
          ('conv2', nn.Conv2d(20,64,5)),
          ('relu2', nn.ReLU())
        ]))