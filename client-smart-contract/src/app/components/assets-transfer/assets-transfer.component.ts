import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-assets-transfer',
  templateUrl: './assets-transfer.component.html',
  styleUrls: ['./assets-transfer.component.css']
})
export class AssetsTransferComponent implements OnInit {

  public form: FormGroup;
  public processing: boolean;
  public message: string;
  public messageClass: string;
  public txids;
  public show: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createRetrieveAssetForm();
  }

  private createRetrieveAssetForm() {
    this.form = this.formBuilder.group({
      public_key: ['', Validators.required]
    });
  }

  // Function to disable form
  private disableForm() {
    this.form.disable();
  }

  // Function to enable form
  private enableForm() {
    this.form.enable();
  }

  public onRetrieveAsset() {
    this.processing = true;
    this.disableForm();

    const key = {
      public_key: this.form.get('public_key').value
    };

    this.authService.retrieveAsset(key).subscribe(response => {
      if (!response.success) {
        this.messageClass = 'alert alert-danger';
      }
      else {
        this.messageClass = 'alert alert-success';
        this.show = true;
        this.txids = JSON.parse(response.txid);
      }

      this.message = response.message;

      setTimeout(() => {
        this.enableForm();
        this.processing = false;
      }, 3000)
    });
  }

  ngOnInit() {
  }

}
