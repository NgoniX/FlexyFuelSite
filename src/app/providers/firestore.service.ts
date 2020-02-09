import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import 'firebase/storage';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor(public afs: AngularFirestore, public auth: AuthService) { }

    addOrder(
        phone: any,
        fuelType: any,
        litres: any,
        location: any,
        deliveryTime: string,
        paymentMethod: string,
        dateTime: any
    ): Promise<void> {
        const id = this.afs.createId();

        return this.afs.doc(`Orders/${id}`).set({
            id,
            phone,
            fuelType,
            litres,
            location,
            deliveryTime,
            paymentMethod,
            dateTime
        });

    }

    addGasOrder(
        phone: any,
        KGs: any,
        location: any,
        deliveryTime: string,
        paymentMethod: string,
        dateTime: any
    ): Promise<void> {
        const id = this.afs.createId();
        const userID = this.auth.getUserID();

        return this.afs.doc(`Gas/${id}`).set({
            id,
            phone,
            KGs,
            location,
            deliveryTime,
            paymentMethod,
            userID,
            dateTime
        });

    }

    addCard(
        name: any,
        age: any,
        phone: any,
        address: any,
        employmentStatus: string,
        fuelQuantities: string,
        dateTime: any
    ): Promise<void> {
        const id = this.afs.createId();

        return this.afs.doc(`Cards/${id}`).set({
            id,
            name,
            age,
            phone,
            address,
            employmentStatus,
            fuelQuantities,
            dateTime
        });

    }

   addSales(
    diesel: any,
    petrol: any,
    amount: any,
    total: string,
    client: string,
    agent: string,
    location: string,
    dateTime: any
    ): Promise<void> {
    const id = this.afs.createId();

    return this.afs.doc(`Sales/${id}`).set({
        id,
        diesel,
        petrol,
        amount,
        total,
        client,
        agent,
        location,
        dateTime
    });

  }

    getUserID(userid: any) {
        return firebase.firestore().collection('Users').where('uid', '==', userid).get();
    }

    getOrders(): Observable<any> {
        return this.afs.collection<any>(`Orders`).valueChanges();
    }

    getGasOrders(): Observable<any> {
        return this.afs.collection<any>(`Gas`).valueChanges();
    }

    getCards(): Observable<any> {
        return this.afs.collection<any>(`Cards`).valueChanges();
    }

    getSales(): Observable<any> {
        return this.afs.collection<any>(`Sales`).valueChanges();
    }

    getPrices(): Observable<any> {
        return this.afs.collection<any>(`Prices`).valueChanges();
    }

    encodeImageUri(imageUri, callback) {
        const c = document.createElement('canvas');
        const ctx = c.getContext('2d');
        const img = new Image();
        img.onload = function() {
            const aux: any = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            const dataURL = c.toDataURL('image/jpeg');
            callback(dataURL);
        };
        img.src = imageUri;
    }

    uploadImage(imageURI, randomId) {
        return new Promise<any>((resolve, reject) => {
            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child('image').child(randomId);
            this.encodeImageUri(imageURI, function(image64) {
                imageRef.putString(image64, 'data_url')
                    .then(snapshot => {
                        snapshot.ref.getDownloadURL()
                            .then(res => resolve(res));
                    }, err => {
                        reject(err);
                    });
            });
        });
    }


}
