import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-assets-create',
  templateUrl: './assets-create.component.html',
  styleUrls: ['./assets-create.component.css']
})
export class AssetsCreateComponent implements OnInit {
  public form: FormGroup;
  public processing: boolean;
  public message: string;
  public messageClass: string;
  public txid: any;
  public show: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createAssetForm();
  }

  private createAssetForm() {
    this.form = this.formBuilder.group({
      asset_name: ['', Validators.required],
      asset_identification: ['', Validators.required],
      asset_description: ['', Validators.required],
      asset_metadata: ['', Validators.required],
      public_key: ['', Validators.required],
      private_key: ['', Validators.required]
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

  public onCreateAsset() {
    this.processing = true;
    this.disableForm();

    const asset = {
      asset_name: this.form.get('asset_name').value,
      asset_identification: this.form.get('asset_identification').value,
      asset_description: this.form.get('asset_description').value,
      asset_metadata: this.form.get('asset_metadata').value,
      public_key: this.form.get('public_key').value,
      private_key: this.form.get('private_key').value
    };

    this.authService.createAsset(asset).subscribe(response => {
      if (!response.success) {
        this.messageClass = 'alert alert-danger';
      }
      else {
        this.messageClass = 'alert alert-success';
        this.show = true;
        this.txid = response.txID;
      }

      this.message = response.message;

      setTimeout(() => {
        this.enableForm();
        this.createAssetForm();
        this.processing = false;
      }, 3000)
    });
  }

  ngOnInit() {
  }

}
