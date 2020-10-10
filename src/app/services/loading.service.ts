import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingOverlay = undefined;

  constructor(public loadingController: LoadingController) { }

  public async presentLoading() {
    this.dismissLoading();
    this.loadingOverlay = await this.loadingController.create({
      cssClass: '',
      message: 'Please wait...',
      duration: 2000
    });
    await this.loadingOverlay.present();

    const { role, data } = await this.loadingOverlay.onDidDismiss();
    console.log('Loading dismissed!');
  }

  public async presentLoadingWithOptions() {
    this.dismissLoading();
    this.loadingOverlay = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await this.loadingOverlay.present();

    const { role, data } = await this.loadingOverlay.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  public dismissLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.dismiss();
    }
  }
}
