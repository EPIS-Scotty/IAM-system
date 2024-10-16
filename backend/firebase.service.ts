import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

var serviceAccount = require("epis-scotty-firebase-adminsdk-zs1ev-fc840252c3.json");

@Injectable()
export class FirebaseService {
  private firestore: admin.firestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: 'https://459881385193.firebaseio.com', // Replace <your-project-id>
      });
    }
    this.firestore = admin.firestore();
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firestore;
  }
}
