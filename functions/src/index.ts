import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const createAuthUser = async ({
  email,
  password,
  uid,
  displayName,
}: {
  email: string;
  password: string;
  uid: string;
  displayName: string;
}) => {
  const userData = {
    email,
    password,
    uid,
    displayName,
    disabled: false,
    emailVerified: true,
  };
  return await admin.auth().createUser(userData);
};

const verifyUser = async (uid: string) => {
  return admin
      .firestore()
      .collection("users")
      .doc(uid)
      .update({id: uid, status: true});
};

const deleteAuthUser = async (uid: string) => {
  return await admin.auth().deleteUser(uid);
};

export const onUserDeleted = functions.firestore
    .document("/users/{userId}")
    .onDelete(async (doc) => {
      const user = doc.data();
      return await deleteAuthUser(user.id);
    });

export const onUserAccountAdded = functions.firestore
    .document("/users/{userId}")
    .onCreate(async (doc) => {
      const data = doc.data();
      return await createAuthUser({
        email: data.email,
        uid: doc.id,
        password: data.password,
        displayName: data.names,
      });
    });

export const onUserAuthCreated = functions.auth
    .user()
    .onCreate(async (user) => {
      return verifyUser(user.uid);
    });
