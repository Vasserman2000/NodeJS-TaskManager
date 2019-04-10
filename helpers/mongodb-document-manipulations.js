// delete a field from documents(s):
db.collection('users').update({},{ $unset: {staus: 1} }, { multi: true });